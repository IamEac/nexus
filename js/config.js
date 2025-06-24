// js/config.js - Configuración Global del Proyecto

window.NEXUS_CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'https://pcesrqdyiixnvmkqngiz.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZXNycWR5aWl4bnZta3FuZ2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDM2NjMsImV4cCI6MjA2NjIxOTY2M30.pCAcgj-bY-ZsSBUK0iFO51MWYUsKKr1AQut3C5yH4pE',
    
    // Legacy Configuration
    LEGACY_PASSWORD: '1612!',
    
    // Storage Buckets
    STORAGE_BUCKETS: {
        movies: 'movies',
        books: 'books',
        articles: 'articles',
        posts: 'posts',
        gallery: 'gallery'
    },
    
    // File Validation
    FILE_VALIDATION: {
        maxSize: 50 * 1024 * 1024, // 50MB
        allowedImages: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        allowedVideos: ['video/mp4', 'video/webm']
    },
    
    // UI Configuration
    UI: {
        animationDuration: 300,
        debounceDelay: 300,
        itemsPerPage: 20,
        maxPostLength: 280
    },
    
    // Feature Flags
    FEATURES: {
        enableNotifications: false,
        enableCustomPages: true,
        enableReactions: false,
        enableComments: false,
        enableDirectMessages: false
    }
};

// Initialize Supabase Client
window.supabaseClient = supabase.createClient(
    window.NEXUS_CONFIG.SUPABASE_URL, 
    window.NEXUS_CONFIG.SUPABASE_ANON_KEY,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true
        }
    }
);