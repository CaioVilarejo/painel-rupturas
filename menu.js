// Função para carregar o menu lateral
function carregarMenu() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    // Obtém o nome do ficheiro atual (ex: representacao.html)
    const paginaAtual = window.location.pathname.split("/").pop();

    // Definição dos links do menu
    const menuItens = [
        { nome: 'Rupturas', icone: 'analytics', link: 'dashboard.html' },
        { nome: 'Histórico', icone: 'timeline', link: 'historico.html' },
        { nome: 'Representação', icone: 'description', link: 'representacao.html' },
        { nome: 'Contas', icone: 'payments', link: 'contas.html' }
    ];

    // Gera o HTML do Menu
    let menuHTML = `
        <aside class="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex no-print h-screen">
            <div>
                <div class="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
                    <img src="https://i.ibb.co/tPcWfmjT/VI-logo-novo-sem-fundo.png" alt="Logo Vilarejo" class="h-8 w-auto object-contain"/>
                    <span class="text-xl font-bold text-gray-800">Monitor</span>
                </div>
                <nav class="space-y-2">
    `;

    menuItens.forEach(item => {
        // Verifica se este item é a página atual
        const estaAtivo = (paginaAtual === item.link);
        const classeAtiva = estaAtivo 
            ? 'bg-primary text-white shadow-md' 
            : 'text-gray-700 hover:bg-gray-100';
        const estiloAtivo = estaAtivo ? 'style="background-color: #ea2a33;"' : '';

        menuHTML += `
            <a href="${item.link}" class="flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${classeAtiva}" ${estiloAtivo}>
                <span class="material-symbols-outlined">${item.icone}</span> ${item.nome}
            </a>
        `;
    });

    // Fecha o nav e adiciona o botão de Sair na parte inferior (dentro do flex-col justify-between)
    menuHTML += `
                </nav>
            </div>

            <div class="border-t pt-4">
                <button onclick="window.location.href='index.html'" class="flex items-center gap-3 p-3 w-full text-gray-500 hover:text-red-600 transition-colors font-medium">
                    <span class="material-symbols-outlined">logout</span> Sair
                </button>
            </div>
        </aside>
    `;

    sidebarContainer.innerHTML = menuHTML;
}

// Executa a função assim que o documento carregar
document.addEventListener('DOMContentLoaded', carregarMenu);
