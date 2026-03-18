<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación - Luana Alondra 9 Años</title>
    <!-- Tailwind CSS para el diseño rápido y responsivo -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Righteous para títulos pop/neón, y Nunito para lectura -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Righteous&display=swap" rel="stylesheet">
    <!-- FontAwesome para íconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        body {
            font-family: 'Nunito', sans-serif;
            background-color: #0d0614; /* Fondo oscuro base */
            margin: 0;
            overflow-x: hidden;
            color: white;
        }

        .font-pop {
            font-family: 'Righteous', cursive;
        }

        /* Efectos Neón basados en Las Guerreras K-Pop */
        .neon-text-pink {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de, 0 0 40px #ff00de, 0 0 80px #ff00de;
        }
        
        .neon-text-blue {
            text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00e5ff, 0 0 40px #00e5ff, 0 0 80px #00e5ff;
        }

        .neon-text-gold {
            text-shadow: 0 0 5px #fff, 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 40px #ffaa00;
        }

        /* Tarjeta estilo cristal */
        .glass-card {
            background: rgba(30, 10, 60, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px 0 rgba(255, 0, 222, 0.2);
        }

        /* Animación de pulso para el botón */
        @keyframes pulse-glow {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 222, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(255, 0, 222, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 222, 0); }
        }

        .btn-neon {
            background: linear-gradient(45deg, #ff00de, #00e5ff);
            animation: pulse-glow 2s infinite;
            transition: transform 0.2s;
        }
        
        .btn-neon:hover {
            transform: scale(1.05);
        }

        /* Ocultar elementos inicialmente */
        .hidden-mission {
            display: none;
            animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: radial-gradient(circle at center, #2a0845 0%, #0d0614 100%);
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4">

    <!-- Fondo interactivo de partículas -->
    <canvas id="canvas-container"></canvas>

    <!-- Contenedor Principal de la Invitación -->
    <main class="glass-card rounded-3xl p-6 md:p-10 max-w-lg w-full text-center relative overflow-hidden mt-8 mb-8">
        
        <!-- Decoración superior -->
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00e5ff] via-[#ff00de] to-[#ffd700]"></div>
        
        <!-- Ícono Musical / Estrella -->
        <div class="flex justify-center mb-4 space-x-3">
            <i class="fa-solid fa-music text-[#ff00de] text-2xl animate-bounce" style="animation-delay: 0.1s;"></i>
            <i class="fa-solid fa-star text-[#ffd700] text-3xl animate-bounce"></i>
            <i class="fa-solid fa-microphone-lines text-[#00e5ff] text-2xl animate-bounce" style="animation-delay: 0.2s;"></i>
        </div>

        <p class="text-sm md:text-base font-bold tracking-widest text-[#00e5ff] uppercase mb-2">
            ¡Estás convocado a la audición secreta!
        </p>

        <h2 class="font-pop text-2xl md:text-3xl text-white mb-1">LAS GUERRERAS K-POP</h2>
        <p class="text-gray-300 text-sm mb-6">Presentan a su estrella principal en vivo</p>

        <!-- Nombre de la cumpleañera -->
        <h1 class="font-pop text-5xl md:text-6xl text-white neon-text-pink mb-4 leading-tight">
            LUANA <br> ALONDRA
        </h1>

        <!-- Edad -->
        <div class="flex items-center justify-center space-x-4 my-6">
            <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ffd700]"></div>
            <h3 class="font-pop text-4xl neon-text-gold">9 AÑOS</h3>
            <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#ffd700]"></div>
        </div>

        <!-- Detalles editables de Fecha y Hora -->
        <div class="bg-black/30 rounded-xl p-4 mb-6 border border-[#ff00de]/30">
            <p class="text-lg font-bold text-white mb-2">
                <i class="fa-regular fa-calendar-check text-[#00e5ff] mr-2"></i> 
                <!-- REEMPLAZA ESTO CON LA FECHA REAL -->
                [Día], [Fecha] de [Mes]
            </p>
            <p class="text-lg font-bold text-white">
                <i class="fa-regular fa-clock text-[#ff00de] mr-2"></i>
                <!-- REEMPLAZA ESTO CON LA HORA REAL -->
                [00:00] PM
            </p>
        </div>

        <!-- Botón interactivo para revelar la dirección -->
        <button id="revealBtn" class="btn-neon text-white font-pop text-lg py-3 px-8 rounded-full w-full uppercase tracking-wider font-bold mb-4 shadow-lg">
            <i class="fa-solid fa-user-secret mr-2"></i> Revelar Misión (Ubicación)
        </button>

        <!-- Sección oculta con la dirección -->
        <div id="missionDetails" class="hidden-mission bg-indigo-900/60 rounded-xl p-5 border border-[#00e5ff]/40">
            <h4 class="font-pop text-[#00e5ff] text-xl mb-2">UBICACIÓN DEL ESCENARIO:</h4>
            <p class="text-white text-lg font-bold leading-relaxed">
                Mz. I Lt. 8 Upis La Libertad
            </p>
            <p class="text-gray-300">
                Ventanilla - Callao
            </p>
            
            <!-- Botón opcional para Google Maps -->
            <a href="https://maps.google.com/?q=Ventanilla+Callao+Upis+La+Libertad" target="_blank" class="inline-block mt-4 text-[#ffd700] underline text-sm hover:text-white transition-colors">
                <i class="fa-solid fa-map-location-dot mr-1"></i> Ver en el mapa
            </a>
        </div>

        <!-- Decoración Inferior -->
        <p class="mt-8 text-xs text-gray-400 italic">
            "No olvides tu pase VIP y tu actitud Huntr/x"
        </p>
    </main>

    <script>
        // Lógica para revelar la dirección (Botón interactivo)
        const revealBtn = document.getElementById('revealBtn');
        const missionDetails = document.getElementById('missionDetails');

        revealBtn.addEventListener('click', () => {
            missionDetails.style.display = 'block';
            revealBtn.style.display = 'none'; // Oculta el botón después de hacer clic
        });

        // Lógica del Canvas para partículas (Estrellas / Magia K-Pop)
        const canvas = document.getElementById('canvas-container');
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        
        // Paleta de colores K-Pop Demon Hunters
        const colors = ['#ff00de', '#00e5ff', '#ffd700', '#9d00ff'];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * -2 - 0.5; // Flotan hacia arriba
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Reaparecer en la parte inferior si salen de la pantalla
                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                }
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                // Efecto de brillo
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                
                ctx.fill();
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0; // Reset
            }
        }

        function initParticles() {
            particles = [];
            // Cantidad de partículas depende del ancho de pantalla
            let particleCount = window.innerWidth < 768 ? 50 : 120;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    </script>
</body>
</html>