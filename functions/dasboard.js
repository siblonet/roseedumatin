function Logged_Checker() {
    const token = sessionStorage.getItem('tirhaka');

    if (token) {
        ///const perset = `${_id}°${name}°${role}°${phone}°${allow}`;
        const splo = token.split("°");
        const nam = splo[1];
        isAdmin = splo[6] == "GIFV" ? true : false;
        const username = thisiswhat(`${nam}`);

        return username;
    } else {
        return null;
    }
}






const managerInit = async () => {
    const tolken = Logged_Checker();
    if (!tolken) {
        window.location.href = "login.html"
    } else {
        document.getElementById('username').innerText = tolken;


    }

}

managerInit();

const Deconnecter = () => {
    sessionStorage.clear();
    window.location.href = "/";
}