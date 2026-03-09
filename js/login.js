// Login functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (checkAuth()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (loginUser(username, password)) {
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show error message
            errorMessage.style.display = 'block';
            
            // Hide error after 3 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
});

// Login user function
function loginUser(username, password) {
    // Check credentials (demo: admin/admin123)
    if (username === 'admin' && password === 'admin123') {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        return true;
    }
    return false;
}

// Check authentication status
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Logout user function
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}
