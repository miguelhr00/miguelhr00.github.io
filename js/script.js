document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica do Menu Hambúrguer (mantida da versão anterior)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fecha o menu quando um link é clicado
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Lógica do Botão Voltar ao Topo
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Mostra ou esconde o botão com base na posição de rolagem
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.style.display = "block";
            scrollToTopBtn.style.opacity = "1"; // Torna visível com opacidade
        } else {
            scrollToTopBtn.style.opacity = "0"; // Esconde com transição suave
            // Adiciona um pequeno atraso para display none após a transição
            setTimeout(() => {
                scrollToTopBtn.style.display = "none";
            }, 300); // Deve ser igual ou maior que a duração da transição CSS
        }
    };

    // Quando o usuário clica no botão, rola para o topo do documento
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rolagem suave
            });
        });
    }

    // 3. Efeito de Digitação no Hero (apenas na página inicial)
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) { // Verifica se o elemento existe na página atual
        const phrases = JSON.parse(typingTextElement.dataset.phrases);
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150; // Velocidade de digitação

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            let displayedText = "";

            if (isDeleting) {
                displayedText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayedText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingTextElement.textContent = displayedText;

            let currentTypingSpeed = typingSpeed;
            if (isDeleting) {
                currentTypingSpeed /= 2; // Apaga mais rápido
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                currentTypingSpeed = 2000; // Pausa no final da frase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                currentTypingSpeed = 500; // Pausa antes de digitar a próxima
            }

            setTimeout(typeWriter, currentTypingSpeed);
        }

        typeWriter(); // Inicia o efeito de digitação
    }

    // 4. Animação de Entrada para Seções (observador de interseção)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Para a animação depois de aparecer
            }
        });
    }, { threshold: 0.1 }); // Começa a animar quando 10% da seção está visível

    // Observa todas as seções com a classe 'content-page'
    document.querySelectorAll('.content-page').forEach(section => {
        observer.observe(section);
    });
});
