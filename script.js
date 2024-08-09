document.addEventListener('DOMContentLoaded', () => {
    const signUpBtn = document.getElementById('sign-up-btn');
    const nextBtn = document.getElementById('next-btn');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('pwd-error');
    const formContainer = document.getElementById('form-container');
    const confirmationContainer = document.getElementById('confirmation-container');

    const getCode = () => Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code

    // Password validation
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let errorMessage = '';
        if (!/[A-Z]/.test(password)) { errorMessage += '. Uppercase letter is required <br>'; }
        if (!/[a-z]/.test(password)) { errorMessage += '. Lowercase letter is required <br>'; }
        if (!/\d/.test(password)) { errorMessage += '. Digit is required <br>'; }
        if (!/[!@#$%^&*()_+\-=\]{}:':"\\|,.<>?]/.test(password)) { errorMessage += '. Special character is required <br>'; }
        if (password.length < 8) { errorMessage += '. Minimum 8 characters required <br>'; }
        passwordError.innerHTML = errorMessage;
    });

    // Registration button click event
    signUpBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert('Email already in use');
            return;
        }

        const confirmationCode = getCode();
        users.push({ name, email, password, confirmationCode });
        localStorage.setItem('users', JSON.stringify(users));

        // Show confirmation container
        formContainer.style.display = 'none';
        confirmationContainer.style.display = 'flex';

        // Log code (simulate sending email)
        console.log(`Confirmation code for ${email}: ${confirmationCode}`);
    });

    // Next button click event
    nextBtn.addEventListener('click', () => {
        const codeInputs = document.querySelectorAll('.code-input');
        const enteredCode = Array.from(codeInputs).map(input => input.value).join('');
        const email = document.getElementById('email').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (!user || user.confirmationCode !== enteredCode) {
            alert('Invalid confirmation code');
            return;
        }

        alert('Email confirmed successfully');
        // Redirect or handle successful registration here
    });
});

// Toggle Help Section
document.getElementById("help-button").addEventListener("click", function() {
    var helpSection = document.getElementById("help-section");
    if (helpSection.style.display === "none") {
        helpSection.style.display = "block";
    } else {
        helpSection.style.display = "none";
    }
});

