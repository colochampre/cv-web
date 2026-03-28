document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const themeToggle = document.getElementById('themeToggle');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navToggler = document.getElementById('navToggler');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========================================
    // Toggle de tema claro/oscuro
    // ========================================
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        }
    };

    const updateThemeIcon = (isDark) => {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    };

    const toggleTheme = () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    };

    themeToggle.addEventListener('click', toggleTheme);
    initTheme();

    // ========================================
    // Scroll suave para links de navegación
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Cerrar menú móvil si está abierto
                navMenu.classList.remove('active');
                
                // Calcular offset del header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Toggle del menú móvil
    // ========================================
    navToggler.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navToggler.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // ========================================
    // Botón volver arriba
    // ========================================
    const toggleScrollTopBtn = () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    };

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Escuchar evento de scroll
    window.addEventListener('scroll', toggleScrollTopBtn);

    // ========================================
    // Animación de barras de habilidades
    // ========================================
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    };

    // Observer para animar cuando la sección sea visible
    const skillsSection = document.getElementById('habilidades');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }

    // ========================================
    // Formulario de contacto (demo)
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> ¡Mensaje enviado!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }
});
