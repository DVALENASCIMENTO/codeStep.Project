document.addEventListener('DOMContentLoaded', () => {
    // Botão "Voltar para o topo"
    document.getElementById('scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Rola suavemente até o topo da página
    });

    // Exibir o botão de rolagem para o topo quando a página for rolada para baixo
    window.addEventListener('scroll', () => {
        const scrollTopButton = document.getElementById('scroll-top');
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopButton.style.display = 'block'; // Mostra o botão
        } else {
            scrollTopButton.style.display = 'none'; // Esconde o botão
        }
    });
});
