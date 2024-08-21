document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const navLinks = document.querySelectorAll('nav a');
    if (navLinks) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetSection = document.querySelector(this.getAttribute('href'));
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Highlight Menu Item on Scroll
    const sections = document.querySelectorAll('section');
    if (sections.length > 0 && navLinks) {
        window.addEventListener('scroll', () => {
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 60) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentSection)) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Portfolio Lightbox
    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    if (portfolioImages) {
        portfolioImages.forEach(img => {
            img.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                document.body.appendChild(lightbox);

                const imgElement = document.createElement('img');
                imgElement.src = this.src;
                lightbox.appendChild(imgElement);

                lightbox.addEventListener('click', () => {
                    lightbox.remove();
                });
            });
        });
    }

    // Form Validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
            } else if (!validateEmail(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
            } else {
                alert('Formulário enviado com sucesso!');
                this.submit(); // Simula o envio do formulário
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Fade-In Animation on Scroll
    const faders = document.querySelectorAll('.about-details, .project, .portfolio-item');
    if (faders) {
        const appearOptions = {
            threshold: 0.5,
            rootMargin: "0px 0px -100px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('appear');
                    appearOnScroll.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            mobileMenu.classList.toggle('toggle');
        });
    }

    // Menu and Image Hover Animation
    const hoverItems = document.querySelectorAll('nav a, .portfolio-item img');
    if (hoverItems) {
        hoverItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.style.transition = 'transform 0.3s ease';
                item.style.transform = 'scale(1.05)';
            });

            item.addEventListener('mouseout', () => {
                item.style.transform = 'scale(1)';
            });
        });
    }

    // Auto-hide navbar on scroll down
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.style.top = '-80px'; // Hide the navbar when scrolling down
        } else {
            navbar.style.top = '0'; // Show the navbar when scrolling up
        }
        lastScrollTop = scrollTop;
    });
});