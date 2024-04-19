function blockPage() {
    const token = sessionStorage.getItem('tirhaka');

    if (token) {

        window.location.href = "/dashboard";

    }
}

blockPage()