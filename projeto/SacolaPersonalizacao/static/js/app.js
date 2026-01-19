// ==================== GERENCIAMENTO DE ESTADO ====================

let estadoAtual = {
    idPedido: null,
    passo: 1,
    logoPath: null,
    instagram: null,
    whatsapp: null,
    usarInstagram: false,
    usarWhatsapp: false,
    fraseOuLogo: 'logo',
    frasePersonalizada: null,
    opcoesAlca: 'padrão'
};

// ==================== VALIDAÇÕES ====================

function validarIdPedido(id) {
    // Validar formato: 14 dígitos, começando com data AAMMDD
    if (!/^\d{14}$/.test(id)) {
        return false;
    }

    const ano = parseInt(id.substring(0, 2));
    const mes = parseInt(id.substring(2, 4));
    const dia = parseInt(id.substring(4, 6));

    // Validar data
    if (mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        return false;
    }

    return true;
}

function validarWhatsApp(whatsapp) {
    const pattern = /^\(\d{2}\)\s9\d{4}-\d{4}$/;
    return pattern.test(whatsapp);
}

function mascararWhatsApp(valor) {
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }

    // Aplica máscara: (XX) 9XXXX-XXXX
    if (valor.length === 0) return '';
    if (valor.length <= 2) return `(${valor}`;
    if (valor.length <= 7) return `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    return `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
}

// ==================== NAVEGAÇÃO ENTRE PASSOS ====================

function mostrarPasso(numeroPasso) {
    // Esconder todos os passos
    const passos = document.querySelectorAll('.step');
    passos.forEach(passo => passo.classList.remove('active'));

    // Mostrar passo atual
    document.getElementById(`step${numeroPasso}`).classList.add('active');

    // Atualizar indicadores
    atualizarIndicadores(numeroPasso);

    // Atualizar barra de progresso
    const progresso = (numeroPasso / 6) * 100;
    document.getElementById('progressBar').style.width = progresso + '%';

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });

    estadoAtual.passo = numeroPasso;
}

function atualizarIndicadores(passo) {
    for (let i = 1; i <= 4; i++) {
        const indicador = document.getElementById(`step${i}-indicator`);
        indicador.classList.remove('active', 'completed');

        if (i < passo) {
            indicador.classList.add('completed');
        } else if (i === passo) {
            indicador.classList.add('active');
        }
    }
}

function voltarPasso(passo) {
    mostrarPasso(passo);
}

// ==================== PASSO 1: VALIDAÇÃO DO PEDIDO ====================

function validarPasso1() {
    const idPedido = document.getElementById('idPedido').value.trim();
    const erroDiv = document.getElementById('erro-pedido');

    erroDiv.classList.remove('visible');
    erroDiv.textContent = '';

    if (!idPedido) {
        erroDiv.textContent = 'Por favor, insira um ID de pedido.';
        erroDiv.classList.add('visible');
        return;
    }

    if (!validarIdPedido(idPedido)) {
        erroDiv.textContent = 'ID inválido. Use o formato: AAMMDD + 8 dígitos (total 14 dígitos)';
        erroDiv.classList.add('visible');
        return;
    }

    // ID válido
    estadoAtual.idPedido = idPedido;
    mostrarPasso(2);
}

document.addEventListener('DOMContentLoaded', function() {
    const inputIdPedido = document.getElementById('idPedido');
    if (inputIdPedido) {
        inputIdPedido.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                validarPasso1();
            }
        });
    }
});

// ==================== PASSO 2: UPLOAD DO LOGOTIPO ====================

function configurarUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const logoUpload = document.getElementById('logoUpload');
    const previewLogo = document.getElementById('preview-logo');
    const logoPreview = document.getElementById('logoPreview');
    const erroLogo = document.getElementById('erro-logo');

    // Drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.style.background = 'rgba(37, 99, 235, 0.15)';
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.style.background = 'rgba(37, 99, 235, 0.05)';
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.style.background = 'rgba(37, 99, 235, 0.05)';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            logoUpload.files = files;
            handleLogoSelect();
        }
    });

    // Click para selecionar
    logoUpload.addEventListener('change', handleLogoSelect);
}

function handleLogoSelect() {
    const logoUpload = document.getElementById('logoUpload');
    const previewLogo = document.getElementById('preview-logo');
    const logoPreview = document.getElementById('logoPreview');
    const erroLogo = document.getElementById('erro-logo');

    const arquivo = logoUpload.files[0];

    if (!arquivo) return;

    // Validar tipo
    if (!arquivo.type.startsWith('image/') && !arquivo.type.includes('svg')) {
        erroLogo.textContent = 'Por favor, selecione um arquivo de imagem válido.';
        erroLogo.classList.add('visible');
        return;
    }

    // Validar tamanho (máximo 5MB)
    if (arquivo.size > 5 * 1024 * 1024) {
        erroLogo.textContent = 'Arquivo muito grande. Máximo: 5MB';
        erroLogo.classList.add('visible');
        return;
    }

    erroLogo.classList.remove('visible');

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
        logoPreview.src = e.target.result;
        previewLogo.style.display = 'block';
    };
    reader.readAsDataURL(arquivo);
}

function validarPasso2() {
    const logoUpload = document.getElementById('logoUpload');
    const erroLogo = document.getElementById('erro-logo');

    erroLogo.classList.remove('visible');

    if (!logoUpload.files || logoUpload.files.length === 0) {
        erroLogo.textContent = 'Por favor, selecione um logotipo.';
        erroLogo.classList.add('visible');
        return;
    }

    mostrarLoadingSpinner();

    // Fazer upload do logotipo
    const formData = new FormData();
    formData.append('id_pedido', estadoAtual.idPedido);
    formData.append('arquivo', logoUpload.files[0]);

    fetch('/api/upload-logo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        ocultarLoadingSpinner();
        if (data.sucesso) {
            estadoAtual.logoPath = data.logo_path;
            mostrarPasso(3);
        } else {
            erroLogo.textContent = data.erro || 'Erro ao fazer upload do logotipo.';
            erroLogo.classList.add('visible');
        }
    })
    .catch(erro => {
        ocultarLoadingSpinner();
        erroLogo.textContent = 'Erro na conexão: ' + erro;
        erroLogo.classList.add('visible');
    });
}

// ==================== PASSO 3: DADOS DE CONTATO ====================

function toggleInstagram() {
    const checkbox = document.getElementById('usar-instagram');
    const instagramInput = document.getElementById('instagram-input');
    estadoAtual.usarInstagram = checkbox.checked;
    instagramInput.style.display = checkbox.checked ? 'block' : 'none';
}

function toggleWhatsApp() {
    const checkbox = document.getElementById('usar-whatsapp');
    const whatsappInput = document.getElementById('whatsapp-input');
    estadoAtual.usarWhatsapp = checkbox.checked;
    whatsappInput.style.display = checkbox.checked ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function() {
            this.value = mascararWhatsApp(this.value);
        });
    }
});

function validarPasso3() {
    const erroContato = document.getElementById('erro-contato');
    const usarInstagram = document.getElementById('usar-instagram').checked;
    const instagram = document.getElementById('instagram').value.trim();
    const usarWhatsapp = document.getElementById('usar-whatsapp').checked;
    const whatsapp = document.getElementById('whatsapp').value.trim();

    erroContato.classList.remove('visible');
    erroContato.textContent = '';

    // Validar Instagram
    if (usarInstagram && !instagram) {
        erroContato.textContent = 'Por favor, insira seu Instagram.';
        erroContato.classList.add('visible');
        return;
    }

    if (usarInstagram && !instagram.startsWith('@')) {
        erroContato.textContent = 'Instagram deve começar com @';
        erroContato.classList.add('visible');
        return;
    }

    // Validar WhatsApp
    if (usarWhatsapp && !whatsapp) {
        erroContato.textContent = 'Por favor, insira seu WhatsApp.';
        erroContato.classList.add('visible');
        return;
    }

    if (usarWhatsapp && !validarWhatsApp(whatsapp)) {
        erroContato.textContent = 'WhatsApp inválido. Use o formato: (XX) 9XXXX-XXXX';
        erroContato.classList.add('visible');
        return;
    }

    mostrarLoadingSpinner();

    // Salvar contato
    const dados = {
        id_pedido: estadoAtual.idPedido,
        instagram: instagram || null,
        whatsapp: whatsapp || null,
        usar_instagram: usarInstagram,
        usar_whatsapp: usarWhatsapp
    };

    fetch('/api/salvar-contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        ocultarLoadingSpinner();
        if (data.sucesso) {
            estadoAtual.instagram = instagram || null;
            estadoAtual.whatsapp = whatsapp || null;
            estadoAtual.usarInstagram = usarInstagram;
            estadoAtual.usarWhatsapp = usarWhatsapp;
            mostrarPasso(4);
        }
    })
    .catch(erro => {
        ocultarLoadingSpinner();
        erroContato.textContent = 'Erro: ' + erro;
        erroContato.classList.add('visible');
    });
}

// ==================== PASSO 4: PERSONALIZAÇÃO ESTRUTURAL ====================

function mostrarOpcaoLogoAlca() {
    document.getElementById('opcao-frase').style.display = 'none';
    estadoAtual.fraseOuLogo = 'logo';
}

function mostrarOpcaoFrase() {
    document.getElementById('opcao-frase').style.display = 'block';
    estadoAtual.fraseOuLogo = 'frase';
}

function validarPasso4() {
    const fraseOuLogo = document.querySelector('input[name="frase-logo"]:checked').value;
    const fraseInput = document.getElementById('frase-input');
    const opcoesAlca = document.querySelector('input[name="opcoes-alca"]:checked').value;

    let frase = null;
    if (fraseOuLogo === 'frase') {
        frase = fraseInput.value.trim();
        if (!frase) {
            alert('Por favor, insira uma frase personalizada.');
            return;
        }
    }

    estadoAtual.fraseOuLogo = fraseOuLogo;
    estadoAtual.frasePersonalizada = frase;
    estadoAtual.opcoesAlca = opcoesAlca;

    mostrarLoadingSpinner();

    const dados = {
        id_pedido: estadoAtual.idPedido,
        frase_ou_logo: fraseOuLogo,
        frase_personalizada: frase,
        opcoes_alca: opcoesAlca
    };

    fetch('/api/salvar-estrutura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        ocultarLoadingSpinner();
        if (data.sucesso) {
            carregarMockup();
            mostrarPasso(5);
        }
    })
    .catch(erro => {
        ocultarLoadingSpinner();
        alert('Erro: ' + erro);
    });
}

// ==================== MOCKUP ====================

function carregarMockup() {
    const mockupImage = document.getElementById('mockup-final');
    const timestamp = new Date().getTime();
    mockupImage.src = `/api/mockup-preview/${estadoAtual.idPedido}?t=${timestamp}`;
}

// ==================== APROVAÇÃO FINAL ====================

function aprovarArte() {
    if (!confirm('Você tem certeza que deseja aprovar esta arte? Após aprovação, levará até 4 dias úteis para postagem.')) {
        return;
    }

    mostrarLoadingSpinner();

    const formData = new FormData();
    formData.append('id_pedido', estadoAtual.idPedido);

    fetch('/api/aprovar-arte', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        ocultarLoadingSpinner();
        if (data.sucesso) {
            document.getElementById('pedido-id-final').textContent = estadoAtual.idPedido;
            document.getElementById('download-png').onclick = () => downloadArquivo('png');
            document.getElementById('download-jpg').onclick = () => downloadArquivo('jpg');
            mostrarPasso(6);
        } else {
            alert('Erro ao aprovar arte: ' + data.erro);
        }
    })
    .catch(erro => {
        ocultarLoadingSpinner();
        alert('Erro: ' + erro);
    });
}

function downloadArquivo(formato) {
    const extensao = formato === 'png' ? 'png' : 'jpg';
    const url = `/api/download/${estadoAtual.idPedido}/final.${extensao}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${estadoAtual.idPedido}_sacola.${extensao}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function novoSolicitacao() {
    estadoAtual = {
        idPedido: null,
        passo: 1,
        logoPath: null,
        instagram: null,
        whatsapp: null,
        usarInstagram: false,
        usarWhatsapp: false,
        fraseOuLogo: 'logo',
        frasePersonalizada: null,
        opcoesAlca: 'padrão'
    };

    // Limpar inputs
    document.getElementById('idPedido').value = '';
    document.getElementById('logoUpload').value = '';
    document.getElementById('instagram').value = '';
    document.getElementById('whatsapp').value = '';
    document.getElementById('usar-instagram').checked = false;
    document.getElementById('usar-whatsapp').checked = false;
    document.getElementById('frase-input').value = '';
    
    // Esconder inputs dependentes
    document.getElementById('instagram-input').style.display = 'none';
    document.getElementById('whatsapp-input').style.display = 'none';
    document.getElementById('preview-logo').style.display = 'none';
    document.getElementById('opcao-frase').style.display = 'none';

    mostrarPasso(1);
}

// ==================== UTILITIES ====================

function mostrarLoadingSpinner() {
    document.getElementById('loading-spinner').classList.add('visible');
}

function ocultarLoadingSpinner() {
    document.getElementById('loading-spinner').classList.remove('visible');
}

// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', function() {
    configurarUpload();
    
    // Event listener para botões de upload clicável
    const uploadLabel = document.querySelector('.upload-label');
    if (uploadLabel) {
        uploadLabel.addEventListener('click', function(e) {
            if (e.target.tagName !== 'INPUT') {
                document.getElementById('logoUpload').click();
            }
        });
    }

    // Focar no input de ID ao carregar
    setTimeout(() => {
        document.getElementById('idPedido').focus();
    }, 100);
});

// Prevent form submission on Enter for some fields
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.id !== 'idPedido') {
                e.preventDefault();
            }
        });
    });
});
