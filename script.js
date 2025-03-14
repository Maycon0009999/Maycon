const API_URL = "https://SEU_BACKEND_NO_RAILWAY.app"; // Coloque a URL do seu backend do Railway

async function entrarNoChat() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert(`Bem-vindo, ${data.user.name}!`);
        // Aqui pode redirecionar para o chat real
    } else {
        alert(data.message);
    }
}

async function cadastrar() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
}
