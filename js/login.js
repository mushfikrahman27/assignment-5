 
document.addEventListener('DOMContentLoaded', function() {
 
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
            
            window.location.href = 'dashboard.html';
        } else {
             
            errorMessage.style.display = 'block';
            
            
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
});

 
function loginUser(username, password) {
     
    if (username === 'admin' && password === 'admin123') {
       
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        return true;
    }
    return false;
}

 
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

 
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}
