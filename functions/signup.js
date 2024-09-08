async function SignUp() {
    const full_name = document.getElementById('full_name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const password1 = document.getElementById('password1').value;
    const loading = document.getElementById('loading');

    if (full_name && email && phone && address && password) {
        if (password === password1) {
            loading.removeAttribute("onclick");
            loading.innerText = "En cours ...";

            const data = {
                name: full_name,
                phone: phone,
                password: password,
                role: "client",
                pushtoken: "null",
                allow: true
            };

            const response = await requesttoBackend('POST', '', data);

            if (!response) {
                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "SignUp()");
                loading.innerText = "CREER";
            } else if (response.token) {
                sessionStorage.setItem('magica', response.token);
                window.location.href = "/dashboard";
                console.log(response.token);
                loading.innerText = "Compte créé";
            } else if (response.ee) {
                alert(`Le ${phone} est déjà associé à un compte`);
                loading.setAttribute("onclick", "SignUp()");
                loading.innerText = "CREER";
            }
        } else {
            alert("Les mot de passe ne sont pas conform.");

        }
    } else {
        alert("Renseignez tous.");


    }



};
