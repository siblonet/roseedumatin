function blockPage() {
    const token = sessionStorage.getItem('magica');

    if (token) {

        window.location.href = "/dashboard";

    }
}

blockPage()