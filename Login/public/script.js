const form = document.getElementById("registerForm");// obtiene el formulario por su id

form.addEventListener("submit", async (e) => {// escucha cuando el usuario envía el formulario
  e.preventDefault();// evita que la página se recargue al enviar

  const username = document.getElementById("username").value;// lee el valor del input usuario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rol= document.getElementById("rol").value;

  const response = await fetch("/register", {//envía los datos al servidor en la ruta /login
    method: "POST",// método HTTP POST para enviar datos
    headers: {
      "Content-Type": "application/json"// indica que el cuerpo es JSON
    },
    body: JSON.stringify({ username,email, password,rol })
  });

  const data = await response.json();
  document.getElementById("message").textContent = data.mensaje;
  document.getElementById("message").style.color = data.rol ? "green" : "red";
});
