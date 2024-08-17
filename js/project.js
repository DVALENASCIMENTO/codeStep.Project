let currentLine = 0;
let codeLines = [];

document.addEventListener('DOMContentLoaded', () => {
    // Obter o parâmetro da URL para determinar qual projeto está sendo acessado
    const urlParams = new URLSearchParams(window.location.search);
    const library = urlParams.get('library');

    // Inicialmente, carrega a biblioteca HTML do projeto correspondente
    if (library) {
        loadLibrary(`data/${library}/html_lines.json`);
    } else {
        console.error('Nenhuma biblioteca foi selecionada.');
    }

    // Botão "Voltar para o topo"
    document.getElementById('scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Exibir o botão de rolagem para o topo quando a página for rolada para baixo
    window.addEventListener('scroll', () => {
        const scrollTopButton = document.getElementById('scroll-top');
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Lógica dos botões "Anterior" e "Próximo"
    document.getElementById('next-line').addEventListener('click', () => {
        if (currentLine < codeLines.length - 1) {
            currentLine++;
            displayLine();
        }
    });

    document.getElementById('prev-line').addEventListener('click', () => {
        if (currentLine > 0) {
            currentLine--;
            displayLine();
        }
    });

    // Adiciona eventos aos botões de linguagem
    document.getElementById('html-btn').addEventListener('click', () => {
        console.log('Carregando biblioteca HTML');
        loadLibrary(`data/${library}/html_lines.json`);
    });

    document.getElementById('css-btn').addEventListener('click', () => {
        console.log('Carregando biblioteca CSS');
        loadLibrary(`data/${library}/css_lines.json`);
    });

    document.getElementById('js-btn').addEventListener('click', () => {
        console.log('Carregando biblioteca JavaScript');
        loadLibrary(`data/${library}/javascript_lines.json`);
    });
});

// Função para carregar a biblioteca selecionada
function loadLibrary(filePath) {
    console.log('Tentando carregar:', filePath);

    fetch(filePath)
        .then(response => {
            console.log('Status da resposta:', response.status);
            if (!response.ok) {
                throw new Error('Erro ao carregar a biblioteca');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados carregados:', data);
            codeLines = data;
            currentLine = 0;
            displayLine();
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

// Função para exibir a linha atual de código e a explicação
function displayLine() {
    const codeDisplay = document.getElementById('code-display');
    const explanationDisplay = document.getElementById('explanation-display');

    if (codeLines.length > 0) {
        const currentCode = codeLines[currentLine]?.code || 'Sem código disponível';
        const currentExplanation = codeLines[currentLine]?.explanation || 'Sem explicação disponível';

        codeDisplay.textContent = currentCode;
        explanationDisplay.textContent = currentExplanation;
    } else {
        codeDisplay.textContent = 'Nenhum código carregado.';
        explanationDisplay.textContent = 'Nenhuma explicação disponível.';
    }
}
