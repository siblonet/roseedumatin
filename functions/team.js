function Logged_Team() {
    const token = sessionStorage.getItem('magica');
    const homconnec = document.getElementById('homconnec');

    if (token) {
        const splo = token.split("°");
        if (thisiswhat(`${splo[2]}`) === "client") {
            window.location.href = "/dashboard"

        } else {
            homconnec.innerText = "Mon Espace";
            homconnec.setAttribute("href", "/dashboard");
        }

    } else {
        window.location.href = "/dashboard"
    }
}

Logged_Team()