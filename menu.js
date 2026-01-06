/**
 * SISTEMA DE SEGURANÇA E MENU - VILAREJO MONITOR
 * Versão com Trava de Usuário e Perfil CD.
 */

(function validarAcesso() {
    const usuarioLogado = localStorage.getItem('vilarejo_user');
    const permissaoRaw = localStorage.getItem('vilarejo_perm');
    const permissao = permissaoRaw ? permissaoRaw.toLowerCase().trim() : '';
    const paginaAtual = window.location.pathname.split("/").pop();

    // 1. Bloqueio de deslogados
    if (!usuarioLogado && paginaAtual !== 'index.html' && paginaAtual !== '') {
        window.location.href = 'index.html';
        return;
    }

    // Se estiver logado, verificar permissões específicas
    if (usuarioLogado) {
        
        // 2. Trava para NOVO USUÁRIO (permissão 'usuário' ou 'usuario')
        // Ele só pode ver a página 'solicitarpermissao.html'
        if ((permissao === 'usuario' || permissao === 'usuário')) {
            if (paginaAtual !== 'solicitarpermissao.html') {
                window.location.href = 'solicitarpermissao.html';
                return;
            }
        }

        // 3. Trava para perfil CD
        // Só pode ver 'pendencias.html'
        const paginasPermitidasCD = ['pendencias.html', 'index.html', ''];
        if (permissao === 'cd' && !paginasPermitidasCD.includes(paginaAtual)) {
            alert('Acesso restrito ao painel de Pendências CD.');
            window.location.href = 'pendencias.html';
            return;
        }

        // 4. Trava de Segurança para Vendedor
        const paginasPermitidasVendedor = ['representacao.html', 'index.html', ''];
        if (permissao === 'vendedor' && !paginasPermitidasVendedor.includes(paginaAtual)) {
            alert('Acesso negado: Seu perfil tem acesso restrito à Representação.');
            window.location.href = 'representacao.html';
            return;
        }
    }
})();

function carregarMenu() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return;

    const permissao = localStorage.getItem('vilarejo_perm') ? localStorage.getItem('vilarejo_perm').toLowerCase().trim() : '';
    const nomeUsuario = localStorage.getItem('vilarejo_user') || 'Usuário';
    const paginaAtual = window.location.pathname.split("/").pop();

    // Se for perfil "usuario", não carregamos o menu lateral (ele fica preso na tela de aviso)
    if (permissao === 'usuario' || permissao === 'usuário') {
        sidebarContainer.innerHTML = ''; 
        return;
    }

    // LISTA DE ITENS DO MENU
    const todosItens = [
        { nome: 'Rupturas', icone: 'analytics', link: 'dashboard.html' },
        { nome: 'Histórico', icone: 'timeline', link: 'historico.html' },
        { nome: 'Representação', icone: 'description', link: 'representacao.html' },
        { nome: 'Contas', icone: 'payments', link: 'contas.html' },
        { nome: 'Pendências CD', icone: 'confirmation_number', link: 'pendencias.html' },
        { nome: 'Calculadora', icone: 'calculate', link: 'calculadora.html' }
    ];

    // Filtro de Visualização do Menu
    const menuItens = todosItens.filter(item => {
        const p = permissao;
        if (['administrador', 'compras'].includes(p)) return true;
        if (p === 'vendedor') return item.nome === 'Representação';
        if (p === 'cd') return item.nome === 'Pendências CD';
        return false;
    });

    let menuHTML = `
        <aside class="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between hidden md:flex no-print h-screen sticky top-0">
            <div>
                <div class="flex items-center gap-3 mb-10 pb-4 border-b border-gray-100">
                    <img src="https://i.ibb.co/tPcWfmjT/VI-logo-novo-sem-fundo.png" alt="Logo Vilarejo" class="h-8 w-auto object-contain"/>
                    <span class="text-xl font-bold text-gray-800">Monitor</span>
                </div>

                <div class="mb-8 px-2">
                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Logado como:</p>
                    <p class="text-sm font-bold text-gray-800 truncate">${nomeUsuario}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-[9px] font-bold text-gray-500 rounded uppercase border border-gray-200">
                        Perfil: ${permissao}
                    </span>
                </div>

                <nav class="space-y-2">
    `;

    menuItens.forEach(item => {
        const estaAtivo = (paginaAtual === item.link);
        const classeAtiva = estaAtivo ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-100';
        const estiloAtivo = estaAtivo ? 'style="background-color: #ea2a33;"' : '';

        menuHTML += `
            <a href="${item.link}" class="flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${classeAtiva}" ${estiloAtivo}>
                <span class="material-symbols-outlined">${item.icone}</span> ${item.nome}
            </a>
        `;
    });

    menuHTML += `
                </nav>
            </div>

            <div class="border-t pt-4">
                <button onclick="logout()" class="flex items-center gap-3 p-3 w-full text-gray-500 hover:text-red-600 transition-colors font-medium">
                    <span class="material-symbols-outlined">logout</span> Sair do Sistema
                </button>
            </div>
        </aside>
    `;

    sidebarContainer.innerHTML = menuHTML;
}

function logout() {
    localStorage.removeItem('vilarejo_user');
    localStorage.removeItem('vilarejo_perm');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', carregarMenu);
