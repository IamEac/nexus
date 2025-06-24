// js/app.js - Inicialización principal
console.log('Nexus App - Iniciando...');

// Temporal: mostrar mensaje mientras se migra el código
document.addEventListener('DOMContentLoaded', () => {
    // Verificar que todos los módulos existan
    if (typeof NexusState === 'undefined') {
        console.warn('Módulos no cargados completamente');
        
        // Mostrar página de mantenimiento
        document.body.innerHTML = `
            <div style="
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 2rem;
                font-family: 'Space Grotesk', sans-serif;
            ">
                <h1 style="
                    font-size: 3rem;
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 1rem;
                ">NEXUS</h1>
                <p style="color: #a0a0a0; font-size: 1.25rem;">
                    Estamos migrando a una nueva arquitectura
                </p>
                <p style="color: #a0a0a0; margin-top: 1rem;">
                    Vuelve pronto para la experiencia completa
                </p>
            </div>
        `;
        return;
    }
    
    // Inicializar la aplicación cuando todos los módulos estén listos
    initializeApp();
});