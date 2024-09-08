async function Login() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const loading = document.getElementById('loading');

    if (phone && password) {
        loading.removeAttribute("onclick");
        loading.innerText = "En cours ...";

        const data = {
            phone: phone,
            password: password,

        };
        const response = await requesttoBackend('POST', 'magicaconnexion', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "Login()");
            loading.innerText = "Connecter";
        } else if (response.token) {
            sessionStorage.setItem('magica', response.token);
            loading.innerText = "Connecté";
            window.location.href = "/dashboard";
        } else if (response.ee) {
            alert("Identifient inccorect");
            loading.setAttribute("onclick", "Login()");
            loading.innerText = "Connecter";
        }

    } else {
        alert("Renseignez tous.");


    }

};
