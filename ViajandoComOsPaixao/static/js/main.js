// =========================================
// VIAJANDO COM OS PAIXÃO - MAIN JAVASCRIPT
// =========================================

const API_BASE = '/api';

// ===== AUTENTICAÇÃO =====
async function verificarAutenticacao() {
    const token = localStorage.getItem('token');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const linkAdmin = document.getElementById('linkAdmin');

    if (token) {
        // Usuário está logado
        if (btnLogin) btnLogin.style.display = 'none';
        if (btnLogout) btnLogout.style.display = 'block';
        if (linkAdmin) linkAdmin.style.display = 'block';
        
        // Validar token
        try {
            const response = await fetch(`${API_BASE}/verificar`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) {
                // Token inválido
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                if (btnLogin) btnLogin.style.display = 'block';
                if (btnLogout) btnLogout.style.display = 'none';
                if (linkAdmin) linkAdmin.style.display = 'none';
            }
        } catch (error) {
            console.error('Erro ao verificar token:', error);
        }
    } else {
        // Usuário não está logado
        if (btnLogin) btnLogin.style.display = 'block';
        if (btnLogout) btnLogout.style.display = 'none';
        if (linkAdmin) linkAdmin.style.display = 'none';
    }
}

function mostrarLogin() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'block';
        abrirTab('login');
    }
}

function fecharLogin() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.style.display = 'none';
    }
    limparMensagensLogin();
}

function limparMensagensLogin() {
    const msgLogin = document.getElementById('msgLogin');
    const msgRegistro = document.getElementById('msgRegistro');
    if (msgLogin) msgLogin.textContent = '';
    if (msgRegistro) msgRegistro.textContent = '';
}

function abrirTab(tabName) {
    // Fechar todas as abas
    const abas = document.querySelectorAll('.tab-content');
    const botoes = document.querySelectorAll('.tab-button');
    
    abas.forEach(aba => aba.classList.remove('active'));
    botoes.forEach(botao => botao.classList.remove('active'));
    
    // Abrir aba selecionada
    const aba = document.getElementById(tabName);
    if (aba) aba.classList.add('active');
    
    // Marcar botão como ativo
    const botao = event.target;
    if (botao) botao.classList.add('active');
}

async function realizarLogin() {
    const email = document.getElementById('emailLogin').value;
    const senha = document.getElementById('senhaLogin').value;
    const msgLogin = document.getElementById('msgLogin');

    if (!email || !senha) {
        msgLogin.className = 'message error';
        msgLogin.textContent = '✗ Preencha todos os campos';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            
            msgLogin.className = 'message success';
            msgLogin.textContent = '✓ Login realizado com sucesso!';
            
            setTimeout(() => {
                fecharLogin();
                verificarAutenticacao();
                location.reload();
            }, 1500);
        } else {
            msgLogin.className = 'message error';
            msgLogin.textContent = '✗ ' + (data.detail || 'Email ou senha incorretos');
        }
    } catch (error) {
        msgLogin.className = 'message error';
        msgLogin.textContent = '✗ Erro ao conectar ao servidor';
        console.error('Erro ao fazer login:', error);
    }
}

async function realizarRegistro() {
    const nome = document.getElementById('nomeRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    const senha = document.getElementById('senhaRegistro').value;
    const senhaConfirm = document.getElementById('senhaConfirm').value;
    const msgRegistro = document.getElementById('msgRegistro');

    // Validações
    if (!nome || !email || !senha || !senhaConfirm) {
        msgRegistro.className = 'message error';
        msgRegistro.textContent = '✗ Preencha todos os campos';
        return;
    }

    if (senha !== senhaConfirm) {
        msgRegistro.className = 'message error';
        msgRegistro.textContent = '✗ As senhas não correspondem';
        return;
    }

    if (senha.length < 6) {
        msgRegistro.className = 'message error';
        msgRegistro.textContent = '✗ Senha deve ter pelo menos 6 caracteres';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/registrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            msgRegistro.className = 'message success';
            msgRegistro.textContent = '✓ Conta criada com sucesso! Faça login agora.';
            
            // Limpar campos
            document.getElementById('nomeRegistro').value = '';
            document.getElementById('emailRegistro').value = '';
            document.getElementById('senhaRegistro').value = '';
            document.getElementById('senhaConfirm').value = '';

            // Mudar para aba de login após 2 segundos
            setTimeout(() => {
                abrirTab('login');
            }, 2000);
        } else {
            msgRegistro.className = 'message error';
            msgRegistro.textContent = '✗ ' + (data.detail || 'Erro ao criar conta. Email pode estar em uso.');
        }
    } catch (error) {
        msgRegistro.className = 'message error';
        msgRegistro.textContent = '✗ Erro ao conectar ao servidor';
        console.error('Erro ao registrar:', error);
    }
}

function logout() {
    if (confirm('Deseja realmente sair?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        verificarAutenticacao();
        location.reload();
    }
}

// ===== POSTS =====
async function carregarPosts(filtro = '') {
    try {
        let url = `${API_BASE}/posts`;
        if (filtro) {
            url += `?filtro=${encodeURIComponent(filtro)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return data.posts || [];
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        return [];
    }
}

async function carregarPostPorId(id) {
    try {
        const response = await fetch(`${API_BASE}/posts/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar post:', error);
        return null;
    }
}

async function adicionarLike(postId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        mostrarLogin();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/posts/${postId}/like`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const botaoLike = event.target;
            botaoLike.classList.toggle('liked');
        }
    } catch (error) {
        console.error('Erro ao adicionar like:', error);
    }
}

// ===== COMENTÁRIOS =====
async function adicionarComentario(postId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        mostrarLogin();
        return;
    }

    const textArea = event.target.previousElementSibling;
    const texto = textArea.value.trim();

    if (!texto) {
        alert('Digite um comentário');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/posts/${postId}/comentarios`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto })
        });

        if (response.ok) {
            textArea.value = '';
            // Recarregar comentários
            const comentariosDiv = document.getElementById(`comentarios-${postId}`);
            if (comentariosDiv) {
                carregarComentarios(postId);
            }
        }
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
}

async function carregarComentarios(postId) {
    try {
        const response = await fetch(`${API_BASE}/posts/${postId}/comentarios`);
        const data = await response.json();

        const comentariosDiv = document.getElementById(`comentarios-${postId}`);
        if (!comentariosDiv) return;

        let html = '';
        if (data.comentarios && data.comentarios.length > 0) {
            data.comentarios.forEach(comentario => {
                html += `
                    <div class="comentario">
                        <strong>${comentario.usuario}</strong>
                        <p>${comentario.texto}</p>
                        <small>${new Date(comentario.data).toLocaleDateString('pt-BR')}</small>
                    </div>
                `;
            });
        } else {
            html = '<p class="sem-comentarios">Nenhum comentário ainda. Seja o primeiro!</p>';
        }

        comentariosDiv.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}

// ===== CLIMA =====
async function obterClima(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
        );
        const data = await response.json();
        return data.current;
    } catch (error) {
        console.error('Erro ao obter clima:', error);
        return null;
    }
}

function obterDescricaoTempo(codigo) {
    const descricoes = {
        0: '☀️ Céu limpo',
        1: '🌤️ Parcialmente nublado',
        2: '☁️ Nublado',
        3: '☁️ Muito nublado',
        45: '🌫️ Neblina',
        48: '🌫️ Neblina',
        51: '🌧️ Chuva leve',
        53: '🌧️ Chuva moderada',
        55: '⛈️ Chuva intensa',
        61: '🌧️ Chuva',
        63: '🌧️ Chuva forte',
        65: '⛈️ Chuva muito forte',
        71: '❄️ Neve leve',
        73: '❄️ Neve',
        75: '❄️ Neve forte',
        77: '❄️ Grãos de neve',
        80: '🌧️ Chuva',
        81: '⛈️ Chuva forte',
        82: '⛈️ Chuva muito forte',
        85: '❄️ Neve',
        86: '❄️ Neve forte',
        95: '⛈️ Tempestade'
    };
    return descricoes[codigo] || '🌍 Desconhecido';
}

// ===== GALERIA FILTERS =====
function filtrarGaleria() {
    const filtroLocal = document.getElementById('filtroLocal')?.value.toLowerCase() || '';
    const filtroPais = document.getElementById('filtroPais')?.value.toLowerCase() || '';

    const itens = document.querySelectorAll('.gallery-item');
    
    itens.forEach(item => {
        const local = item.dataset.local?.toLowerCase() || '';
        const pais = item.dataset.pais?.toLowerCase() || '';

        const mostraLocal = !filtroLocal || local.includes(filtroLocal);
        const mostraPais = !filtroPais || pais.includes(filtroPais);

        if (mostraLocal && mostraPais) {
            item.style.display = 'block';
            item.style.animation = 'slideInUp 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===== MODAL PARA FOTOS GRANDES =====
function abrirFotoGrande(src, titulo = '') {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="background: transparent; box-shadow: none; max-width: 90vw;">
            <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
            <img src="${src}" style="width: 100%; height: auto; border-radius: 8px;">
            ${titulo ? `<p style="color: white; text-align: center; margin-top: 1rem;">${titulo}</p>` : ''}
        </div>
    `;
    document.body.appendChild(modal);

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    };
}

// ===== FECHAR MODAL AO CLICAR FORA =====
window.onclick = (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();

    // Adicionar listeners aos filtros
    const filtroLocal = document.getElementById('filtroLocal');
    const filtroPais = document.getElementById('filtroPais');

    if (filtroLocal) filtroLocal.addEventListener('input', filtrarGaleria);
    if (filtroPais) filtroPais.addEventListener('input', filtrarGaleria);
});

// ===== UTILITÁRIOS =====
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatarHora(data) {
    return new Date(data).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function truncarTexto(texto, comprimento = 100) {
    if (texto.length > comprimento) {
        return texto.substring(0, comprimento) + '...';
    }
    return texto;
}

// ===== NOTIFICAÇÕES =====
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notif = document.createElement('div');
    notif.className = `notificacao notificacao-${tipo}`;
    notif.textContent = mensagem;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${tipo === 'success' ? '#51CF66' : tipo === 'error' ? '#FF6B6B' : '#4ECDC4'};
        color: white;
        border-radius: 4px;
        z-index: 3000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ===== EXPORT PARA USO GLOBAL =====
window.verificarAutenticacao = verificarAutenticacao;
window.mostrarLogin = mostrarLogin;
window.fecharLogin = fecharLogin;
window.abrirTab = abrirTab;
window.realizarLogin = realizarLogin;
window.realizarRegistro = realizarRegistro;
window.logout = logout;
window.carregarPosts = carregarPosts;
window.adicionarLike = adicionarLike;
window.adicionarComentario = adicionarComentario;
window.carregarComentarios = carregarComentarios;
window.obterClima = obterClima;
window.filtrarGaleria = filtrarGaleria;
window.abrirFotoGrande = abrirFotoGrande;
window.formatarData = formatarData;
window.truncarTexto = truncarTexto;
window.mostrarNotificacao = mostrarNotificacao;
