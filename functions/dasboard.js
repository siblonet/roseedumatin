let user_id;
function Logged_Checker() {
    const token = sessionStorage.getItem('tirhaka');

    if (token) {
        ///const perset = `${_id}°${name}°${role}°${phone}°${allow}`;
        const splo = token.split("°");
        user_id = thisiswhat(`${splo[0]}`);
        const nam = splo[1];
        isAdmin = splo[2] == "GIFV" ? true : false;
        const username = thisiswhat(`${nam}`);

        return username;
    } else {
        return null;
    }
}





const RendDataAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    vide_message.innerText = user_id;


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


const RendDataClient = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";

    const APPOINTMEN_DATA = await requesttoBackend('GET', `tirhakaappointmentgettingone/${user_id}`);
    if (APPOINTMEN_DATA.length > 0) {
        vide_message.innerText = "Vos rendez-vous";

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
                        <p>Nom: <span>${appointment.worker.name}</span></p>
                        <p>Tél: <span>${appointment.worker.phone}</span></p>
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

        vide_message.innerText = "Vous d'avez programmé aucun rende-vous";

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


const managerInit = async () => {
    const tolken = Logged_Checker();
    if (!tolken) {
        window.location.href = "connexion"
    } else {
        document.getElementById('username').innerText = tolken;
        if (isAdmin) {
            await RendDataAdmin()

        } else {
            await RendDataClient()

        }
    }

}
managerInit();

const ChangeService = (html_tag_id) => {
    const htmlchange = document.getElementById(`${html_tag_id}`);
    document.getElementById('Rendez-vous').classList.remove('current');
    document.getElementById('Services').classList.remove('current');
    document.getElementById('Clients').classList.remove('current');
    document.getElementById('Personnels').classList.remove('current');
    htmlchange.classList.add('current');

}




const RendServicesAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    vide_message.innerText = user_id;


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


}




const RendClientAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    vide_message.innerText = user_id;


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

}



const RendPersonelAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    vide_message.innerText = user_id;


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

}