const form = document.getElementById("loginForm");// obtiene el formulario por su id

form.addEventListener("submit", async (e) => {// escucha cuando el usuario envía el formulario
  e.preventDefault();// evita que la página se recargue al enviar

  const username = document.getElementById("username").value;// lee el valor del input usuario
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {//envía los datos al servidor en la ruta /login
    method: "POST",// método HTTP POST para enviar datos
    headers: {
      "Content-Type": "application/json"// indica que el cuerpo es JSON
    },
    body: JSON.stringify({ username, password })// convierte los datos a JSON
  });

  const data = await response.json();// espera y convierte la respuesta del servidor a objeto JS
  document.getElementById("message").textContent = data.message;// muestra el mensaje devuelto por el servidor
  document.getElementById("message").style.color = data.success ? "green" : "red";// colorea según éxito o error
});
