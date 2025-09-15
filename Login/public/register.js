document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;
    const messageElement = document.getElementById('message');

    // Validaciones básicas
    if (!nombre || !email || !password) {
        messageElement.textContent = 'Todos los campos son obligatorios';
        messageElement.style.color = 'red';
        return;
    }

    if (password.length < 6) {
        messageElement.textContent = 'La contraseña debe tener al menos 6 caracteres';
        messageElement.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                email,
                password,
                rol
            }),
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.textContent = 'Usuario registrado exitosamente!';
            messageElement.style.color = 'green';
            
            // Limpiar formulario
            document.getElementById('registerForm').reset();
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            messageElement.textContent = data.error || 'Error al registrar usuario';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Error de conexión con el servidor';
        messageElement.style.color = 'red';
    }
});