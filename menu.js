/**
 * SISTEMA DE SEGURANÇA E MENU - VILAREJO MONITOR
 * Versão com Atendimento e Ajuste de Layout.
 */

(function validarAcesso() {
    const usuarioLogado = localStorage.getItem('vilarejo_user');
    const permissaoRaw = localStorage.getItem('vilarejo_perm');
    const permissao = permissaoRaw ? permissaoRaw.toLowerCase().trim() : '';
    const paginaAtual = window.location.pathname.split("/").pop();

    if (!usuarioLogado && paginaAtual !== 'index.html' && paginaAtual !== '') {
        window.location.href = 'index.html';
        return;
    }

    if (usuarioLogado) {
        if ((permissao === 'usuario' || permissao === 'usuário')) {
            if (paginaAtual !== 'solicitarpermissao.html') {
                window.location.href = 'solicitarpermissao.html';
                return;
            }
        }

        const paginasPermitidasCD = ['pendencias.html', 'index.html', ''];
        if (permissao === 'cd' && !paginasPermitidasCD.includes(paginaAtual)) {
            alert('Acesso restrito ao painel de Pendências CD.');
            window.location.href = 'pendencias.html';
            return;
        }

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

    if (permissao === 'usuario' || permissao === 'usuário') {
        sidebarContainer.innerHTML = ''; 
        return;
    }

    // LISTA DE ITENS DO MENU ATUALIZADA
    const todosItens = [
        { nome: 'Rupturas', icone: 'analytics', link: 'dashboard.html' },
        { nome: 'Histórico', icone: 'timeline', link: 'historico.html' },
        { nome: 'Atendimento', icone: 'support_agent', link: 'atendimento.html' }, // Novo item
        { nome: 'Representação', icone: 'description', link: 'representacao.html' },
        { nome: 'Contas', icone: 'payments', link: 'contas.html' },
        { nome: 'Pendências CD', icone: 'confirmation_number', link: 'pendencias.html' },
        { nome: 'Calculadora', icone: 'calculate', link: 'calculadora.html' }
    ];

    const menuItens = todosItens.filter(item => {
        const p = permissao;
        if (['administrador', 'compras'].includes(p)) return true;
        if (p === 'vendedor') return item.nome === 'Representação';
        if (p === 'cd') return item.nome === 'Pendências CD';
        return false;
    });

    let menuHTML = `
        <aside class="w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between hidden md:flex no-print h-screen sticky top-0">
            <div class="overflow-y-auto no-scrollbar">
                <div class="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                    <img src="https://i.ibb.co/tPcWfmjT/VI-logo-novo-sem-fundo.png" alt="Logo Vilarejo" class="h-7 w-auto object-contain"/>
                    <span class="text-lg font-bold text-gray-800">Monitor</span>
                </div>

                <div class="mb-6 px-1">
                    <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Logado como:</p>
                    <p class="text-sm font-bold text-gray-800 truncate">${nomeUsuario}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 bg-gray-50 text-[9px] font-bold text-gray-400 rounded uppercase border border-gray-100">
                        Perfil: ${permissao}
                    </span>
                </div>

                <nav class="space-y-1">
    `;

    menuItens.forEach(item => {
        const estaAtivo = (paginaAtual === item.link);
        const classeAtiva = estaAtivo ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50';
        const estiloAtivo = estaAtivo ? 'style="background-color: #E30613;"' : '';

        menuHTML += `
            <a href="${item.link}" class="flex items-center gap-3 p-2.5 rounded-xl text-[13px] font-semibold transition-all ${classeAtiva}" ${estiloAtivo}>
                <span class="material-symbols-outlined text-[20px]">${item.icone}</span> ${item.nome}
            </a>
        `;
    });

    menuHTML += `
                </nav>
            </div>

            <div class="border-t pt-4 mt-4">
                <button onclick="logout()" class="flex items-center gap-3 p-2.5 w-full text-gray-400 hover:text-red-600 transition-colors text-[13px] font-bold">
                    <span class="material-symbols-outlined text-[20px]">logout</span> Sair do Sistema
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
