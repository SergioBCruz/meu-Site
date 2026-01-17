// Funções para gerenciar posts
async function carregarPosts() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        exibirPosts(posts);
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        mostrarMensagem('Erro ao carregar posts', 'error');
    }
}

function exibirPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Nenhum post ainda. Crie o primeiro!</p>';
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <h2>${post.titulo}</h2>
            <div class="post-meta">
                <strong>Autor:</strong> ${post.autor} | 
                <strong>Data:</strong> ${new Date(post.criado_em).toLocaleDateString('pt-BR')}
            </div>
            <div class="post-content">
                ${post.conteudo}
            </div>
            <div class="post-actions">
                <button class="btn btn-primary" onclick="abrirPostDetalhes(${post.id})">Ver Detalhes</button>
                <button class="btn btn-danger" onclick="deletarPost(${post.id})">Deletar</button>
            </div>
        </div>
    `).join('');
}

async function criarPost(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const conteudo = document.getElementById('conteudo').value;
    const autor = document.getElementById('autor').value;

    if (!titulo || !conteudo || !autor) {
        mostrarMensagem('Preencha todos os campos', 'error');
        return;
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, conteudo, autor })
        });

        if (response.ok) {
            mostrarMensagem('Post criado com sucesso!', 'success');
            document.getElementById('form-post').reset();
            carregarPosts();
        } else {
            mostrarMensagem('Erro ao criar post', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao criar post', 'error');
    }
}

async function deletarPost(postId) {
    if (!confirm('Tem certeza que deseja deletar este post?')) {
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensagem('Post deletado com sucesso!', 'success');
            carregarPosts();
        } else {
            mostrarMensagem('Erro ao deletar post', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao deletar post', 'error');
    }
}

async function abrirPostDetalhes(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`);
        const post = await response.json();
        
        // Carregar comentários
        const commentsResponse = await fetch(`/api/posts/${postId}/comentarios`);
        const comentarios = await commentsResponse.json();

        exibirPostDetalhes(post, comentarios);
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao carregar post', 'error');
    }
}

function exibirPostDetalhes(post, comentarios) {
    const container = document.getElementById('posts-container');
    
    const comentariosHTML = comentarios.length > 0 
        ? comentarios.map(c => `
            <div class="comment">
                <span class="comment-author">${c.autor}</span>
                <span class="comment-date">${new Date(c.criado_em).toLocaleDateString('pt-BR')}</span>
                <div class="comment-text">${c.texto}</div>
                <button class="btn btn-danger" style="margin-top: 0.5rem; padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="deletarComentario(${c.id})">Deletar</button>
            </div>
        `).join('')
        : '<p>Nenhum comentário ainda.</p>';

    container.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <button class="btn btn-secondary" onclick="carregarPosts()">← Voltar</button>
        </div>
        
        <div class="post-card">
            <h2>${post.titulo}</h2>
            <div class="post-meta">
                <strong>Autor:</strong> ${post.autor} | 
                <strong>Data:</strong> ${new Date(post.criado_em).toLocaleDateString('pt-BR')}
            </div>
            <div class="post-content">
                ${post.conteudo}
            </div>
            <div class="post-actions">
                <button class="btn btn-danger" onclick="deletarPost(${post.id})">Deletar Post</button>
            </div>
        </div>

        <div class="comments-section">
            <h3>Comentários (${comentarios.length})</h3>
            ${comentariosHTML}
            
            <hr style="margin: 1.5rem 0;">
            
            <h4>Adicionar Comentário</h4>
            <form onsubmit="adicionarComentario(event, ${post.id})">
                <div class="form-group">
                    <input type="text" id="nome-comentario" placeholder="Seu nome" required>
                </div>
                <div class="form-group">
                    <textarea id="texto-comentario" placeholder="Seu comentário" required></textarea>
                </div>
                <button type="submit" class="btn btn-success">Enviar Comentário</button>
            </form>
        </div>
    `;
}

async function adicionarComentario(event, postId) {
    event.preventDefault();

    const texto = document.getElementById('texto-comentario').value;
    const autor = document.getElementById('nome-comentario').value;

    if (!texto || !autor) {
        mostrarMensagem('Preencha todos os campos', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ texto, autor })
        });

        if (response.ok) {
            mostrarMensagem('Comentário adicionado com sucesso!', 'success');
            document.getElementById('texto-comentario').value = '';
            document.getElementById('nome-comentario').value = '';
            abrirPostDetalhes(postId);
        } else {
            mostrarMensagem('Erro ao adicionar comentário', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao adicionar comentário', 'error');
    }
}

async function deletarComentario(comentarioId) {
    if (!confirm('Tem certeza que deseja deletar este comentário?')) {
        return;
    }

    try {
        const response = await fetch(`/api/comentarios/${comentarioId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensagem('Comentário deletado com sucesso!', 'success');
            // Recarregar a página de detalhes
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('post');
            if (postId) {
                abrirPostDetalhes(postId);
            } else {
                carregarPosts();
            }
        } else {
            mostrarMensagem('Erro ao deletar comentário', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao deletar comentário', 'error');
    }
}

function mostrarMensagem(mensagem, tipo = 'info') {
    const alertsContainer = document.getElementById('alerts-container');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo}`;
    alertDiv.textContent = mensagem;
    
    alertsContainer.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Carregar posts quando a página abre
document.addEventListener('DOMContentLoaded', () => {
    carregarPosts();
});
