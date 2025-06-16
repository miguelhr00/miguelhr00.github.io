// Este script lida com o menu hambúrguer para dispositivos móveis
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o ícone do hambúrguer e a lista de links de navegação
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Adiciona um ouvinte de evento de clique ao ícone do hambúrguer
    if (hamburger && navLinks) { // Garante que os elementos existem na página
        hamburger.addEventListener('click', () => {
            // Alterna a classe 'active' no ícone do hambúrguer
            hamburger.classList.toggle('active');
            // Alterna a classe 'active' na lista de links de navegação para mostrar/esconder o menu
            navLinks.classList.toggle('active');
        });

        // Opcional: Fecha o menu quando um link é clicado (útil em single-page applications ou se houver rolagem de âncora)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Remove a classe 'active' para fechar o menu e o ícone
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
