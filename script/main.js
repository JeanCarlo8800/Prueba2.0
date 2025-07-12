document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DEL MENÚ MÓVIL (SIDEBAR) ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');
    const mainContent = document.querySelector('main');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('-translate-x-full');
        menuIconOpen.classList.toggle('hidden');
        menuIconClose.classList.toggle('hidden');
    });

    function closeMenu() {
        if (!sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.add('-translate-x-full');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        }
    }
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
    mainContent.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeMenu();
    });

    // --- LÓGICA DEL FORMULARIO DE WHATSAPP (CON MODAL) ---
    const form = document.getElementById("whatsappForm");
    const modal = document.getElementById("confirmationModal");
    const modalContent = modal.querySelector('div');
    const closeModalBtn = document.getElementById("closeModalBtn");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(correo)) {
            document.getElementById("correo").focus();
            return;
        }
        if (nombre && correo && mensaje) {
            const texto = `¡Hola! Vengo de su página web.%0A%0AMi nombre es ${nombre}.%0AEmail: ${correo}%0A%0AMensaje: ${mensaje}`;
            const numero = "506600988"; // IMPORTANTE: Reemplaza con tu número real
            window.open(`https://wa.me/${numero}?text=${texto}`, "_blank");
            
            // Mostrar el modal
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
            }, 10);
            
            form.reset();
        }
    });
    
    const closeModal = () => {
        modal.classList.add('opacity-0');
        modalContent.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- LÓGICA PARA RESALTAR ENLACE ACTIVO AL HACER SCROLL ---
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    
    // --- LÓGICA PARA ANIMACIÓN DE APARICIÓN EN SCROLL ---
    const revealSections = document.querySelectorAll('.reveal-section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // --- Botón de volver arriba ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.remove('hidden', 'opacity-0');
        } else {
            scrollTopBtn.classList.add('opacity-0');
            setTimeout(() => scrollTopBtn.classList.add('hidden'), 300);
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});