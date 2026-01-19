// ========================================
// PROTEÇÃO DE LOGIN - ADMIN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se está logado
    checkAdminLogin();
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }

    // Alterar senha
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', openPasswordModal);
    }

    // Form de alteração de senha
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', saveNewPassword);
    }
});

// ========================================
// VERIFICAR SE ESTÁ LOGADO
// ========================================

function checkAdminLogin() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const username = localStorage.getItem('adminUsername');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Redirecionar para login
        window.location.href = 'login.html';
        return;
    }

    // Mostrar mensagem de boas-vindas
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        userGreeting.textContent = `Bem-vindo, ${username}!`;
    }
}

// ========================================
// LOGOUT
// ========================================

function performLogout() {
    if (confirm('Tem certeza que deseja fazer logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'login.html';
    }
}

// ========================================
// ALTERAR SENHA
// ========================================

function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.remove('show');
    }
    // Limpar formulário
    const form = document.getElementById('changePasswordForm');
    if (form) {
        form.reset();
    }
}

function saveNewPassword(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Obter credenciais armazenadas
    const credentials = getStoredAdminCredentials();

    // Validar senha atual
    if (currentPassword !== credentials.password) {
        alert('❌ Senha atual incorreta!');
        return;
    }

    // Validar confirmação
    if (newPassword !== confirmPassword) {
        alert('❌ As senhas não coincidem!');
        return;
    }

    // Validar comprimento
    if (newPassword.length < 6) {
        alert('❌ A nova senha deve ter pelo menos 6 caracteres!');
        return;
    }

    // Atualizar credenciais
    const username = localStorage.getItem('adminUsername');
    const newCredentials = {
        username: username,
        password: newPassword
    };

    localStorage.setItem('adminCredentials', JSON.stringify(newCredentials));

    alert('✅ Senha alterada com sucesso!');
    closePasswordModal();
}

// ========================================
// OBTER CREDENCIAIS ARMAZENADAS
// ========================================

function getStoredAdminCredentials() {
    const stored = localStorage.getItem('adminCredentials');
    if (stored) {
        return JSON.parse(stored);
    }
    // Credenciais padrão
    return {
        username: 'admin',
        password: 'admin123'
    };
}

// ========================================
// FECHAR MODAL AO CLICAR FORA
// ========================================

window.addEventListener('click', function(event) {
    const modal = document.getElementById('passwordModal');
    if (modal && event.target === modal) {
        closePasswordModal();
    }
});
