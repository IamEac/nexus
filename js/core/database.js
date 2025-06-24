// js/core/database.js - Operaciones CRUD con Supabase

window.NexusDB = {
    // Generic CRUD operations
    async create(table, data) {
        try {
            const { data: result, error } = await supabaseClient
                .from(table)
                .insert([data])
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data: result };
        } catch (error) {
            console.error(`Error creating ${table}:`, error);
            return { success: false, error: error.message };
        }
    },
    
    async read(table, filters = {}, options = {}) {
        try {
            let query = supabaseClient.from(table).select(options.select || '*');
            
            // Apply filters
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            
            // Apply ordering
            if (options.orderBy) {
                query = query.order(options.orderBy, { 
                    ascending: options.ascending ?? false 
                });
            }
            
            // Apply limit
            if (options.limit) {
                query = query.limit(options.limit);
            }
            
            const { data, error } = await query;
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error(`Error reading ${table}:`, error);
            return { success: false, error: error.message };
        }
    },
    
    async update(table, id, data) {
        try {
            const { data: result, error } = await supabaseClient
                .from(table)
                .update(data)
                .eq('id', id)
                .select()
                .single();
            
            if (error) throw error;
            return { success: true, data: result };
        } catch (error) {
            console.error(`Error updating ${table}:`, error);
            return { success: false, error: error.message };
        }
    },
    
    async delete(table, id) {
        try {
            const { error } = await supabaseClient
                .from(table)
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error(`Error deleting from ${table}:`, error);
            return { success: false, error: error.message };
        }
    },
    
    // Specific data loading methods
    async loadAllUserData(userId = null) {
        try {
            const userFilter = userId || NexusState.viewingUserId || null;
            const filters = userFilter ? { user_id: userFilter } : {};
            const options = { orderBy: 'created_at', ascending: false };
            
            // Load all data types in parallel
            const [playlists, movies, books, articles, posts, media] = await Promise.all([
                this.read('playlists', filters, options),
                this.read('movies', filters, options),
                this.read('books', filters, options),
                this.read('articles', filters, options),
                this.read('posts', filters, options),
                this.read('media', filters, options)
            ]);
            
            // Update state
            NexusState.data = {
                playlists: playlists.data || [],
                movies: movies.data || [],
                books: books.data || [],
                articles: articles.data || [],
                posts: posts.data || [],
                media: media.data || []
            };
            
            // Load user profile if viewing another user
            if (userFilter && userFilter !== NexusState.currentUser?.id) {
                const { data: profile } = await supabaseClient
                    .from('profiles')
                    .select('*')
                    .eq('id', userFilter)
                    .single();
                
                if (profile) {
                    NexusState.setState('viewingUserProfile', profile);
                }
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error loading user data:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Content-specific methods
    async createPlaylist(playlistData) {
        const playlist = {
            ...playlistData,
            user_id: NexusState.currentUser?.id || null,
            type: playlistData.url.includes('youtube') ? 'YouTube' : 'Spotify'
        };
        
        // Extract video/playlist IDs for YouTube
        if (playlist.type === 'YouTube') {
            const videoMatch = playlist.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
            const playlistMatch = playlist.url.match(/list=([^&\n?#]+)/);
            
            if (videoMatch) playlist.videoid = videoMatch[1];
            if (playlistMatch) playlist.playlistid = playlistMatch[1];
        }
        
        return this.create('playlists', playlist);
    },
    
    async createMovie(movieData) {
        const movie = {
            ...movieData,
            user_id: NexusState.currentUser?.id || null
        };
        return this.create('movies', movie);
    },
    
    async createBook(bookData) {
        const book = {
            ...bookData,
            user_id: NexusState.currentUser?.id || null
        };
        return this.create('books', book);
    },
    
    async createArticle(articleData) {
        const article = {
            ...articleData,
            user_id: NexusState.currentUser?.id || null
        };
        return this.create('articles', article);
    },
    
    async createPost(postData) {
        const post = {
            ...postData,
            user_id: NexusState.currentUser?.id || null
        };
        return this.create('posts', post);
    },
    
    async createMedia(mediaData) {
        const media = {
            ...mediaData,
            user_id: NexusState.currentUser?.id || null
        };
        return this.create('media', media);
    }
};