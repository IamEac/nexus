// js/core/auth.js - Módulo de Autenticación

window.NexusAuth = {
    // Check current auth status
    async checkAuthStatus() {
        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                const { data: profile } = await supabaseClient
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                
                if (profile) {
                    user.profile = profile;
                }
                
                NexusState.setState('currentUser', user);
                NexusState.setState('isAuthenticated', true);
                
                console.log('Usuario autenticado:', user);
                this.updateUIForAuth(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking auth status:', error);
            return false;
        }
    },
    
    // Login
    async login(email, password) {
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            NexusState.setState('currentUser', data.user);
            await this.checkAuthStatus();
            await NexusFollow.loadFollowRelationships();
            
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Register
    async register(email, password, fullName, username) {
        try {
            // Check if username already exists
            const { data: existingUser } = await supabaseClient
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();
            
            if (existingUser) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            
            // Register user
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        username: username
                    }
                }
            });
            
            if (error) throw error;
            
            // Update profile
            if (data.user) {
                await supabaseClient
                    .from('profiles')
                    .update({ username, full_name: fullName })
                    .eq('id', data.user.id);
            }
            
            return { 
                success: true, 
                message: '¡Registro exitoso! Revisa tu email para confirmar tu cuenta.' 
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    // Logout
    async logout() {
        try {
            await supabaseClient.auth.signOut();
            NexusState.resetState();
            location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    },
    
    // Update UI for auth state
    updateUIForAuth(isLoggedIn) {
        if (isLoggedIn && NexusState.currentUser) {
            document.getElementById('authIcon').textContent = '👤';
            document.getElementById('authText').textContent = 
                NexusState.currentUser.profile?.username || 
                NexusState.currentUser.email.split('@')[0];
            
            NexusUI.showActionButtons();
        }
    },
    
    // Legacy auth check
    checkSavedAuth() {
        const authExpiry = localStorage.getItem('eac_auth_expiry');
        if (authExpiry && new Date().getTime() < parseInt(authExpiry)) {
            NexusState.setState('isAuthenticated', true);
            return true;
        }
        return false;
    },
    
    // Save legacy auth
    saveAuth() {
        const expiryTime = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
        localStorage.setItem('eac_auth_expiry', expiryTime);
    },
    
    // Check legacy password
    checkPassword(password) {
        return password === NEXUS_CONFIG.LEGACY_PASSWORD;
    }
};

// Auth state change listener
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session) {
        document.getElementById('authIcon').textContent = '👤';
        document.getElementById('authText').textContent = session.user.email.split('@')[0];
    } else {
        document.getElementById('authIcon').textContent = '👤';
        document.getElementById('authText').textContent = 'Iniciar Sesión';
    }
});