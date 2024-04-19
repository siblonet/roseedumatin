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





const RendData = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";


    const APPOINTMEN_DATA = await requesttoBackend('GET', 'tirhakaappointmentgettingall');
    if (APPOINTMEN_DATA.length > 0) {
        vide_message.innerText = "Les rendez-vous programmé";

        APPOINTMEN_DATA.forEach((appointment, index) => {
            const appointmentHTML = `
            <div class="appoin_service">
                        <p class="titlerec">Service</p>
                        <p>Service: <span>${appointment.services.service}</span></p>
                        <p>Type de service: <span>${appointment.services.servicetype}</span></p>
                        <p>Date: <span>${appointment.dete}</span></p>
                        <p>L'heure: <span>${appointment.heure}</span></p>
                    </div>
                    <br>
                    <div class="appoin_client">
                        <p class="titlerec">Client</p>
                        <p>Nom: <span>${appointment.client.name}</span></p>
                        <p>Domicile: <span>${appointment.ville}, ${appointment.commune}, ${appointment.lieu}</span></p>
                        <p>Tél: <span>${appointment.client.phone}</span></p>
                        <p>Message: <span>${appointment.message}</span></p>
                    </div>
                    <br>
                    <div class="action_btn">
                        <a class="btnA _Acc">Accepter</a>
                        <a class="btnA _Anu">Annuler</a>
                    </div>
            `;


            appoint_data.innerHTML += appointmentHTML;
        })
    } else {

        vide_message.innerText = "Pas de rendez-vous d'abord";

    }


    /*services: {
        servicetype: string;
        service: string;
        availability: boolean;
        price: number;
    };
    ville: string;
    commune: string;
    lieu: string;
    message: string;
    statut: string;
    client: TirhakaUserEntity;
    worker: TirhakaUserEntity;
    price: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    dete: String;
    heure: String;
    created?: Date;*/
}

const Deconnecter = () => {
    sessionStorage.clear();
    window.location.href = "/";
}


const managerInit = async () => {
    const tolken = Logged_Checker();
    if (!tolken) {
        window.location.href = "login.html"
    } else {
        document.getElementById('username').innerText = tolken;
        await RendData()
    }

}
managerInit();