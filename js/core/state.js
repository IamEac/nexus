// js/core/state.js - Gestión de Estado Global

window.NexusState = {
    // User State
    currentUser: null,
    viewingUserId: null,
    viewingUserProfile: null,
    isOwnerView: true,
    isAuthenticated: false,
    
    // Navigation State
    currentSection: 'home',
    
    // UI State
    editingItem: null,
    isUploading: false,
    
    // Data State
    data: {
        playlists: [],
        movies: [],
        books: [],
        articles: [],
        posts: [],
        media: []
    },
    
    // Social State
    followingUsers: [],
    userFollowCounts: {},
    
    // Features State
    customPages: [],
    notifications: [],
    unreadNotifications: 0,
    
    // State Management Methods
    setState(key, value) {
        this[key] = value;
        this.notifyListeners(key, value);
    },
    
    getState(key) {
        return this[key];
    },
    
    // Observer Pattern
    listeners: {},
    
    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
        
        // Return unsubscribe function
        return () => {
            this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
        };
    },
    
    notifyListeners(key, value) {
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value));
        }
    },
    
    // Reset State
    resetState() {
        this.currentUser = null;
        this.viewingUserId = null;
        this.viewingUserProfile = null;
        this.isOwnerView = true;
        this.isAuthenticated = false;
        this.followingUsers = [];
        this.userFollowCounts = {};
        this.customPages = [];
        this.notifications = [];
        this.unreadNotifications = 0;
        this.data = {
            playlists: [],
            movies: [],
            books: [],
            articles: [],
            posts: [],
            media: []
        };
    }
};