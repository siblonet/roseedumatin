let user_id;
let servicesalonexis;
let servicedomicileexis;


function Logged_Checker() {
    const token = sessionStorage.getItem('magica');

    if (token) {
        ///const perset = `${_id}°${name}°${role}°${phone}°${allow}`;
        const splo = token.split("°");
        user_id = thisiswhat(`${splo[0]}`);
        const nam = splo[1];
        isAdmin = splo[2] == "GIFV" ? true : false;
        wRole = thisiswhat(`${splo[2]}`);
        const username = thisiswhat(`${nam}`);

        return username;
    } else {
        return null;
    }
}

const add_service = document.getElementById('add_service');

const RendDataAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    add_service.innerHTML = "";


    try {
        const APPOINTMEN_DATA = await requesttoBackend('GET', 'magicaappointmentgettingall');
        if (APPOINTMEN_DATA.length > 0) {
            vide_message.innerText = "Les rendez-vous programmé";

            APPOINTMEN_DATA.forEach((appointment, index) => {
                const appointmentHTML = `
                    <div class="appoint_data">
                        <div class="appoin_service">
                                <p class="titlerec">Service</p>
                                <p>Service: <span>${appointment.services.service}</span></p>
                                <p>Type de service: <span>${appointment.services.servicetype}</span></p>
                                <p>Date: <span>${appointment.dete}</span></p>
                                <p>L'heure: <span>${appointment.heure}:00</span></p>
                            </div>
                            <br>
                            <div class="appoin_client">
                                <p class="titlerec">Client</p>
                                <p>Nom: <span>${appointment.client.name}</span></p>
                                <p>Tél: <span>${appointment.client.phone}</span></p>
                                <p>Message: <span>${appointment.message}</span></p>
                            </div>
                            <br>
                            <div class="action_btn">
                            <a class="btnA _Acc" ${appointment.worker && appointment.worker._id !== user_id ? 'disabled' : ''} onclick="AcceptingAppointmen('${appointment._id}')">
                            ${appointment.statut !== "waiting" ? "C'est fait" : "Accepter"}
                        </a>
                            <a class="btnA _Anu" ${appointment.statut !== "waiting" ? 'disabled' : ''}>Annuler</a>
                            </div>
                        </div>
                    </div>
                        `;


                appoint_data.innerHTML += appointmentHTML;
            })
        } else {

            vide_message.innerText = "Pas de rendez-vous d'abord";

        }
    } catch (error) {
        vide_message.innerText = "Erreur inconnu, actualisez";

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
    client: magicaUserEntity;
    worker: magicaUserEntity;
    price: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    dete: String;
    heure: String;
    created?: Date;*/
}



const AcceptingAppointmen = async (ida) => {
    const data = {
        statut: "En cours",
        worker: user_id
    };

    const response = await requesttoBackend('PUT', `magicaappointmentstatusupdate/${ida}`, data);

    if (!response) {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");

    } else if (response) {
        window.location.reload();
    }
}



const RendMesCharge = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    add_service.innerHTML = "";

    try {
        const APPOINTMEN_DATA = await requesttoBackend('GET', `gettingallmychargedapointment/${user_id}`);
        if (APPOINTMEN_DATA.length > 0) {
            vide_message.innerText = "Vos rendez-vous";

            APPOINTMEN_DATA.forEach((appointment, index) => {

                const appointmentHTML = `
                    <div class="appoint_data">

                        <div class="appoin_service">
                            <p class="titlerec">Service</p>
                            <p>Service: <span>${appointment.services.service}</span></p>
                            <p>Type de service: <span>${appointment.services.servicetype}</span></p>
                            <p>Date: <span>${appointment.dete}</span></p>
                            <p>L'heure: <span>${appointment.heure}:00</span></p>
                        </div>
                        <br>
                        <div class="appoin_client">
                            <p class="titlerec">Client</p>
                            <p>Nom: <span>${appointment.client.name}</span></p>
                            <p>Tél: <span>${appointment.client.phone}</span></p>
                            <p>Message: <span>${appointment.message}</span></p>
                        </div>
                        <br>
                        <div class="action_btn">
                            <a class="btnA _Acc">${appointment.statut !== "waiting" ? "C'est fait" : "Accepter"}</a>
                            <a class="btnA _Anu" ${appointment.statut !== "waiting" ? 'disabled' : ''}>Annuler</a>
                        </div>
                       
                    </div>
                        `;


                appoint_data.innerHTML += appointmentHTML;
            })
        } else {

            vide_message.innerText = "Vos n'avez pas rendez-vous";

        }
    } catch (error) {
        vide_message.innerText = "Erreur inconnu, actualisez";

    }

}



const RendDataClient = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    add_service.innerHTML = "";

    try {
        const APPOINTMEN_DATA = await requesttoBackend('GET', `magicaappointmentgettingone/${user_id}`);
        if (APPOINTMEN_DATA.length > 0) {
            vide_message.innerText = "Vos rendez-vous";

            APPOINTMEN_DATA.forEach((appointment, index) => {
                const appointmentHTML = `
                <div class="appoint_data">

                    <div class="appoin_service">
                        <p class="titlerec">Service</p>
                        <p>Service: <span>${appointment.services.service}</span></p>
                        <p>Type de service: <span>${appointment.services.servicetype}</span></p>
                        <p>Date: <span>${appointment.dete}</span></p>
                        <p>L'heure: <span>${appointment.heure}</span></p>
                    </div>
                    <br>
                    <div class="appoin_client">
                        <p class="titlerec">magica</p>
                        <p>Nom: <span>${appointment.worker ? appointment.worker.name : "magica"}</span></p>
                        <p>Tél: <span>${appointment.worker ? appointment.worker.phone : "magica"}</span></p>
                    </div>
                    <br>
                    <div class="action_btn">
                        <a class="btnA _Acc">${appointment.statut !== "waiting" ? appointment.statut : "En attent"}</a>
                        <a class="btnA _Anu" ${appointment.statut !== "waiting" ? 'disabled' : ''}>Annuler</a>
                    </div>
                </div>
                        `;


                appoint_data.innerHTML += appointmentHTML;
            })

        } else {

            vide_message.innerText = "Vous d'avez programmé aucun rende-vous";

        }
    } catch (error) {
        console.log(error);
        vide_message.innerText = "Erreur inconnu, actualisez";

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
    client: magicaUserEntity;
    worker: magicaUserEntity;
    price: number;
    payment_method: string;
    payment_status: string;
    transaction_id: string;
    dete: String;
    heure: String;
    created?: Date;*/
}


const ChangeService = (html_tag_id) => {
    const htmlchange = document.getElementById(`${html_tag_id}`);

    const Rendez_vous = document.getElementById('Rendez-vous');
    Rendez_vous ? Rendez_vous.classList.remove('current') : null;

    const Services = document.getElementById('Services');
    Services ? Services.classList.remove('current') : null;

    const Clients = document.getElementById('Clients');
    Clients ? Clients.classList.remove('current') : null;

    const Personnels = document.getElementById('Personnels');
    Personnels ? Personnels.classList.remove('current') : null;

    const account = document.getElementById('account');
    account ? account.classList.remove('current') : null;

    const Charges = document.getElementById('Charges');
    Charges ? Charges.classList.remove('current') : null;

    htmlchange.classList.add('current');

    switch (html_tag_id) {
        case 'Rendez-vous':
            RendDataAdmin()
            break;

        case 'Services':
            RendServicesAdmin()

            break;

        case 'Clients':
            RendClientAdmin()

            break;

        case 'Personnels':
            RendPersonelAdmin()

            break;
        case 'Charges':
            RendMesCharge()

            break;

        default:
            AccountShow()
            break;
    }

}

let selectedServiceType;
let selectedServiceState;

document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.querySelector('select[name="servicetype"]');

    selectElement.addEventListener("change", function () {
        selectedServiceType = selectElement.value;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.querySelector('select[name="servicestate"]');

    selectElement.addEventListener("change", function () {
        selectedServiceState = selectElement.value;
    });
});


const SupprimerServiceService = async (serio, ido) => {
    const response = await requesttoBackend('DELETE', `removemagicaserviceadd/${serio}/${ido}`);
    if (!response) {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");

    } else if (response.done) {
        RendServicesAdmin();
    } else {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");
    }
}


async function SupprimerAdda(serio, serviceId) {

    add_service.innerHTML = `
        <a data-toggle="modal" data-target="#addService" style="align-self: flex-end !important; color: #D51A65; padding: 10px; cursor: pointer;" onclick="SupprimerServiceService('${serio}', '${serviceId}')">
            Supprimer
        </a>
        <a data-toggle="modal" data-target="#addService" style="align-self: flex-end !important; color: #007bff; padding: 10px; cursor: pointer;" onclick="AddShow()">
            Ajouter un service
        </a>
    `;
}




const AddService = async () => {
    const serviceprice = document.getElementById('serviceprice').value;
    const servicename = document.getElementById('servicename').value;
    const loading = document.getElementById('loading');

    if (servicename && selectedServiceState && selectedServiceType && serviceprice) {
        loading.removeAttribute("onclick");
        loading.innerText = "En cours ...";
        const data = {
            services: [{
                service: servicename,
                availability: selectedServiceState === "true" ? true : false,
                price: serviceprice,
            }],
            servicetype: selectedServiceType,
            availability: true,
        };

        if (!servicesalonexis || !servicedomicileexis) {
            const response = await requesttoBackend('POST', 'magicaservicecreation', data);
            if (!response) {
                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "AddService()");
                loading.innerText = "Ajouter";
            } else if (response) {
                RendServicesReloada(response);
                RemoveShow();
                loading.setAttribute("onclick", "AddService()");
                loading.innerText = "Ajouter";
            }
        } else {
            const response = await requesttoBackend('PUT', `magicaserviceadd/magicaservicespdate/${selectedServiceType}`, data.services);
            if (!response) {
                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "AddService()");
                loading.innerText = "Ajouter";
            } else if (response) {
                RendServicesReloada(response);
                RemoveShow();
                loading.setAttribute("onclick", "AddService()");
                loading.innerText = "Ajouter";
            }
        }
    } else {
        alert("Renseignez tous.");
    }
}

const SupprimerService = async (serid) => {

    const response = await requesttoBackend('DELETE', `magicadeletingservice/${serid}`);
    if (!response) {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");

    } else if (response.done) {
        RendServicesAdmin();
    } else {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");
    }
}


const AddShow = () => {
    document.getElementById('addService').classList.add("showService");
}

const RemoveShow = () => {
    document.getElementById('addService').classList.remove("showService");
}

const RendServicesAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    vide_message.innerText = "Chargement ...";

    try {
        const APPOINTMEN_DATA = await requesttoBackend('GET', 'magicaservicegetting');
        add_service.innerHTML = `
        <a style="align-self: flex-end !important; color: #007bff; padding: 10px; cursor: pointer;" onclick="AddShow()">
            Ajouter un service
        </a>
`;
        if (APPOINTMEN_DATA.length > 0) {
            servicesalonexis = APPOINTMEN_DATA.find(ee => ee.servicetype == "PACKAGE") ? true : false;
            servicedomicileexis = APPOINTMEN_DATA.find(ee => ee.servicetype == "PARTICULIER") ? true : false;

            vide_message.innerText = "LISTE DE VOS SERVICES";
            APPOINTMEN_DATA.forEach((servic, index) => {
                const appointmentHTML = `
                <div class="appoint_data">

                    <div id="step-1" class="tab-pane" role="tabpanel" aria-labelledby="step-1">
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <select class="form-control form-group" name="category">
                                    <option value="${servic.servicetype}">${servic.servicetype}</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <select class="form-control form-group" name="servicesservice" onchange="SupprimerAdda('${servic._id}', this.value)">
                                    <option value="">LISTES DES SERVICES</option>
                                    ${servic.services.map(ss_ => {
                    return `
                                            <option value="${ss_._id}">${ss_.service}</option>
                                        `;
                }).join('')}
                                </select>
                            </div>
                            <div class="col-lg-4 col-md-6 ${servic.availability ? "availa" : "unavaila"}">
                                <p>${servic.availability ? "Disponible" : "Indisponible"}</p>
                            </div>
                            <div class="col-lg-4 col-md-6 supprima">
                                <p style="cursor: pointer;" onclick="SupprimerService('${servic._id}')">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </div>
                        `;
                appoint_data.innerHTML += appointmentHTML;
            })

        } else {
            servicesalonexis = false;
            servicedomicileexis = false
            vide_message.innerText = "Aucun service en line";

        }
    } catch (error) {
        vide_message.innerText = "Erreur inconnu, actualisez";


    }
    /**
     * 
     *  services: [{
            _id?: string;
            servicetype: string;
            service: string;
            availability: boolean;
            price: number;
        }];
        availability: boolean;
     */
}


const RendServicesReloada = async (APPOINTMEN_DAT) => {
    const appoint_data = document.getElementById('appoint_data');
    appoint_data.innerHTML = "";

    if (APPOINTMEN_DAT.length > 0) {
        servicesalonexis = APPOINTMEN_DAT.find(ee => ee.servicetype == "PACKAGE") ? true : false;
        servicedomicileexis = APPOINTMEN_DAT.find(ee => ee.servicetype == "PARTICULIER") ? true : false;

        APPOINTMEN_DAT.forEach((servic, index) => {
            const appointmentHTML = `
            <div class="appoint_data">

                <div id="step-1" class="tab-pane" role="tabpanel" aria-labelledby="step-1">
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <select class="form-control form-group" name="category">
                                    <option value="${servic.servicetype}">${servic.servicetype}</option>
                            </select>
                        </div>
                        <div class="col-lg-4 col-md-6">
                        <select class="form-control form-group" name="servicesservice" onchange="SupprimerAdda('${servic._id}', this.value)">
                        <option value="">LISTES DES SERVICES</option>
                                ${servic.services.map(ss_ => {
                return `
                                    <option value="body">${ss_.service}</option>
                                `;
            }).join('')}
                            </select>
                        </div>
                        <div class="col-lg-4 col-md-6 ${servic.availability ? "availa" : "unavaila"}">
                            <p>${servic.availability ? "Disponible" : "Indisponible"}</p>
                        </div>
                        <div class="col-lg-4 col-md-6 supprima">
                            <p style="cursor: pointer;" onclick="SupprimerService('${servic._id}')">Supprimer</p>
                        </div>
                    </div>
                    </div>
            </div>
                    `;
            appoint_data.innerHTML += appointmentHTML;
        })
    }

}



const RendClientAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    add_service.innerHTML = "";
    try {
        const TIRHACLIENTS = await requesttoBackend('GET', '');
        if (TIRHACLIENTS.length > 0) {
            vide_message.innerText = "Listes de vos Clients en ligne";

            TIRHACLIENTS.forEach((tirhaclient, index) => {
                const tirhaclienHTML = tirhaclient.role === "client" ? `
                    <div class="appoint_data">
                        <div class="appoin_client">
                            <p class="titlerec">Client</p>
                            <p style="text-transform: capitalize;">Nom: <span>${tirhaclient.name}</span></p>
                            <p>Tél: <span>${tirhaclient.phone}</span></p>
                            <p>Mail: <span>${tirhaclient.email}</span></p>
                            <p>Adress: <span>${tirhaclient.address}</span></p>
                            <p>Etat: <span>${tirhaclient.allow ? 'Actif' : 'Bloqué'}</span></p>
                        </div>
                        <br>
                        <div class="action_btn">
                            <a class="btnA _Acc">Modifier</a>
                            <a class="btnA _Anu">Supprimer</a>
                        </div>
                    </div>
                ` : '';

                appoint_data.innerHTML += tirhaclienHTML;
            });

        } else {

            vide_message.innerText = "Pas de client en linge";

        }
    } catch (error) {
        vide_message.innerText = "Erreur inconnu, actualisez";

    }
}



const RendPersonelAdmin = async () => {
    const appoint_data = document.getElementById('appoint_data');
    const vide_message = document.getElementById('vide_message');
    appoint_data.innerHTML = "";
    add_service.innerHTML = "";
    try {
        const TIRHACLIENTS = await requesttoBackend('GET', '');
        if (TIRHACLIENTS.length > 0) {
            vide_message.innerText = "Listes de vos Employées";

            TIRHACLIENTS.forEach((tirhaclient, index) => {
                const tirhaclienHTML = tirhaclient.role !== "client" ? `
                    <div class="appoint_data">
                        <div class="appoin_client">
                            <p class="titlerec">Personnels</p>
                            <p style="text-transform: capitalize;">Nom: <span>${tirhaclient.name}</span></p>
                            <p>Tél: <span>${tirhaclient.phone}</span></p>
                            <p>Mail: <span>${tirhaclient.email}</span></p>
                            <p>Adress: <span>${tirhaclient.address}</span></p>
                            <p>Etat: <span>${tirhaclient.allow ? 'Actif' : 'Bloqué'}</span></p>
                        </div>
                        <br>
                        <div class="action_btn">
                            <a class="btnA _Acc">Modifier</a>
                            <a class="btnA _Anu">Supprimer</a>
                        </div>
                    </div>
                ` : '';

                appoint_data.innerHTML += tirhaclienHTML;
            });

        } else {

            vide_message.innerText = "Vos Employées n'ont pas créé de compte";

        }
    } catch (error) {
        vide_message.innerText = "Erreur inconnu, actualisez";

    }
}



const AccountShow = async () => {
    const accountinfo = await requesttoBackend('GET', `gettingmyaccountinfo/${user_id}`);
    if (accountinfo) {
        document.getElementById('accountid').value = accountinfo._id;
        document.getElementById('full_name').value = accountinfo.name;
        document.getElementById('email').value = accountinfo.email;
        document.getElementById('phone').value = accountinfo.phone;
        document.getElementById('address').value = accountinfo.address;
    }
    var myModal = new bootstrap.Modal($("#successModal"));
    myModal.toggle();

    //document.getElementById('accountView').classList.add("showService");
}

const UpdateUser = async () => {
    const accountid = document.getElementById('accountid').value;
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const loading = document.getElementById('loadinguser');

    loading.removeAttribute("onclick");
    loading.innerText = "En cours ...";
    const data = {
        name: full_name,
        phone: phone,
        address: address,
        email: email,
    };

    const response = await requesttoBackend('PUT', `${accountid}`, data);
    if (!response) {
        alert("Échec, vérifiez votre connexion ou essayez plus tard.");
        loading.setAttribute("onclick", "UpdateUser()");
        loading.innerText = "Modifier";
    } else if (response) {
        loading.setAttribute("onclick", "UpdateUser()");
        loading.innerText = "Modifier";
        document.getElementById('accountView').classList.remove("showService");

    }


}

const RemoveAccountShow = () => {
    document.getElementById('accountView').classList.remove("showService");
}

const managerInit = async () => {
    const tolken = Logged_Checker();
    if (!tolken) {
        window.location.href = "connexion"
    } else {
        document.getElementById('username').innerText = tolken;
        if (isAdmin) {
            document.getElementById('teams').style.display = "block";

            const menulistAdmin = `
                        <li class="menu-item-has-children">
                            <a class="menudashboard current" id="Rendez-vous"
                                onclick="ChangeService('Rendez-vous')">Rendez-vous</a>
                        </li>

                        <li class="menu-item-has-children">
                            <a class="menudashboard" id="Charges" onclick="ChangeService('Charges')">Charges</a>
                        </li>

                        <li class="menu-item-has-children">
                            <a class="menudashboard" id="Services" onclick="ChangeService('Services')">Services</a>
                        </li>

                        <li class="menu-item-has-children">
                            <a class="menudashboard" id="Clients" onclick="ChangeService('Clients')">Clients</a>
                        </li>

                        <li class="menu-item-has-children">
                            <a class="menudashboard" id="Personnels"
                                onclick="ChangeService('Personnels')">Personnels</a>
                        </li>
            `;

            document.getElementById('menulist').innerHTML = menulistAdmin;

            await RendDataAdmin();

        } else if (wRole === "worker") {
            document.getElementById('teams').style.display = "block";

            const menulistWorker = `
                            <li class="menu-item-has-children">
                            <a class="menudashboard current" id="Rendez-vous"
                                onclick="ChangeService('Rendez-vous')">Rendez-vous</a>
                            </li>

                            <li class="menu-item-has-children">
                            <a class="menudashboard" id="Charges" onclick="ChangeService('Charges')">Charges</a>
                            </li>

                            <li class="menu-item-has-children">
                            <a class="menudashboard" id="Services" onclick="ChangeService('Services')">Services</a>
                            </li>
            `;
            document.getElementById('menulist').innerHTML = menulistWorker;

            await RendDataAdmin();
        } else if (wRole === "client") {
            document.getElementById('teams').style.display = "none";

            const menulistClient = `
                            <li class="menu-item-has-children">
                            <a class="menudashboard current" id="Rendez-vous"
                                onclick="ChangeService('Rendez-vous')">Rendez-vous</a>
                            </li>

                            <li class="menu-item-has-children">
                            <a class="menudashboard" id="account" onclick="ChangeService('account')">Mes Infos</a>
                            </li>
            `;
            document.getElementById('menulist').innerHTML = menulistClient;

            await RendDataClient();

        } else {

        }
    }

}
managerInit();