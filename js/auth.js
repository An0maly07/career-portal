/* ===================================
   AUTH.JS — Login / Signup
   =================================== */

const Auth = {
    init() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Signup form
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Toggle forms
        document.getElementById('show-signup').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-form-container').classList.add('hidden');
            document.getElementById('signup-form-container').classList.remove('hidden');
        });

        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signup-form-container').classList.add('hidden');
            document.getElementById('login-form-container').classList.remove('hidden');
        });
    },

    handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            App.toast('Please fill in all fields', 'error');
            return;
        }

        // Check if user exists
        const users = JSON.parse(localStorage.getItem('cl_users') || '[]');
        const user = users.find(u => u.email === email);

        if (!user) {
            App.toast('No account found with this email. Please sign up!', 'error');
            return;
        }

        if (user.password !== password) {
            App.toast('Incorrect password. Try again!', 'error');
            return;
        }

        // Show loader
        const btn = document.getElementById('login-btn');
        btn.querySelector('span').textContent = 'Signing in...';
        btn.querySelector('.btn-loader').classList.remove('hidden');
        btn.disabled = true;

        setTimeout(() => {
            App.currentUser = user;
            localStorage.setItem('cl_user', JSON.stringify(user));
            App.toast('Welcome back, ' + user.name + '! 🎉', 'success');
            App.onLogin();

            // Reset button
            btn.querySelector('span').textContent = 'Sign In';
            btn.querySelector('.btn-loader').classList.add('hidden');
            btn.disabled = false;
        }, 1000);
    },

    handleSignup() {
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const interest = document.getElementById('signup-interest').value;

        if (!name || !email || !password || !interest) {
            App.toast('Please fill in all fields', 'error');
            return;
        }

        if (password.length < 4) {
            App.toast('Password must be at least 4 characters', 'error');
            return;
        }

        // Check existing
        const users = JSON.parse(localStorage.getItem('cl_users') || '[]');
        if (users.find(u => u.email === email)) {
            App.toast('An account with this email already exists!', 'error');
            return;
        }

        const user = { name, email, password, interest, createdAt: new Date().toISOString() };
        users.push(user);
        localStorage.setItem('cl_users', JSON.stringify(users));

        // Show loader
        const btn = document.getElementById('signup-btn');
        btn.querySelector('span').textContent = 'Creating account...';
        btn.querySelector('.btn-loader').classList.remove('hidden');
        btn.disabled = true;

        setTimeout(() => {
            App.currentUser = user;
            localStorage.setItem('cl_user', JSON.stringify(user));
            App.toast('Account created! Welcome, ' + name + '! 🚀', 'success');
            App.onLogin();

            // Reset button
            btn.querySelector('span').textContent = 'Create Account';
            btn.querySelector('.btn-loader').classList.add('hidden');
            btn.disabled = false;
        }, 1200);
    }
};

document.addEventListener('DOMContentLoaded', () => Auth.init());
