function Logged_Rend() {
    const token = sessionStorage.getItem('tirhaka');

    if (token) {
        const homconnec = document.getElementById('homconnec');
        homconnec.innerText = "Mon Espace";
        homconnec.setAttribute("href", "/dashboard");
    }
};

Logged_Rend();

const nestnavigator = document.getElementById('nestnavigator');
const nestnavigator2 = document.getElementById('nestnavigator2');
nestnavigator.setAttribute("onclick", "AddRemoveEven()")
nestnavigator2.setAttribute("onclick", "AddGobackEven()")
nestnavigator.classList.add("disabled");


const AddGobackEven = () => {
    nestnavigator.disabled = false;

    if (nestnavigator2.innerText == "Étape 2") {
        nestnavigator2.innerText = "Étape 1";
        nestnavigator.innerText = "Étape 2";
    } else if (nestnavigator2.innerText == "Étape 3") {
        //nestnavigator.innerText = "Fin";
        nestnavigator2.innerText = "Étape 2";
        nestnavigator.innerText = "Étape 3";
    }
}


const AddChekerEven = () => {

}

let selectedTypeValue;
let selectedServiceValue;
let selectedDateValue;
let selectedTime;

const selectElement = document.querySelector('select[name="servicetypehtml"]');

selectElement.addEventListener('change', function () {
    selectedTypeValue = this.value;
    RendServicesAdmin(this.value);
});

const selectService = document.querySelector('select[name="servicesselection"]');

selectService.addEventListener('change', function () {
    selectedServiceValue = this.value;
    nestnavigator.classList.remove("disabled");
    nestnavigator.innerText = "Étape 2";
});

const AddRemoveEven = () => {
    nestnavigator.disabled = true;
    if (nestnavigator.innerText === "Étape 2") {
        const anchors = document.querySelectorAll('a.ui-state-default');

        anchors.forEach(anchor => {
            if (anchor.getAttribute('aria-current') === 'true') {
                // Set aria-current attribute to 'false'
                anchor.setAttribute('aria-current', 'false');
                // Remove all classes from the anchor
                anchor.className = 'ui-state-default';
            }
        });
    } else if (nestnavigator.innerText === "Étape 3") {
        nestnavigator2.innerText = "Étape 2";
    } else if (nestnavigator.innerText === "Étape 4") {
        nestnavigator.innerText = "Fin";
        nestnavigator2.innerText = "Étape 3";
    }/* else {
        console.log("Unexpected value:", nestnavigator.innerText);
    }*/

}

const DateSelectedAddEven = (deta) => {
    selectedDateValue = deta;
    nestnavigator.disabled = false;
    nestnavigator.classList.remove("disabled");
    nestnavigator.innerText = "Étape 3";
}

function LastOptionUser() {
    nestnavigator.innerText = "Étape 4";
    const token = sessionStorage.getItem('tirhaka');
    //const perset = `${_id}°${name}°${role}°${phone}°${allow}°${email}°${address}`;
    if (token) {

        const splo = token.split("°");

        const userid_rendez = document.getElementById("userid_rendez");
        userid_rendez.value = thisiswhat(`${splo[0]}`);

        const full_name = document.getElementById("full_name");
        full_name.value = thisiswhat(`${splo[1]}`);
        full_name.disabled = true;
        const phonea = document.getElementById("phone");
        phonea.value = thisiswhat(`${splo[3]}`);
        phonea.disabled = true;
        const emaila = document.getElementById("email");
        emaila.value = thisiswhat(`${splo[5]}`);
        emaila.disabled = true;
        const addressa = document.getElementById("address");
        addressa.value = thisiswhat(`${splo[6]}`);
        addressa.disabled = true;

        const password = document.getElementById("password");
        password.disabled = true;
        const password1 = document.getElementById("password1");
        password1.disabled = true;
    }

}


const loading = document.getElementById('loading');

const CreatUser = async () => {
    // Getting input values
    const full_name = document.getElementById("full_name").value;
    const phonea = document.getElementById("phone").value;
    const emaila = document.getElementById("email").value;
    const addressa = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;

    if (full_name && phonea && emaila && addressa && password) {
        if (password === password1) {
            loading.removeAttribute("onclick");
            loading.innerText = "En cours ...";

            const data = {
                name: full_name,
                phone: phonea,
                password: password,
                role: "client",
                address: addressa,
                email: emaila,
                pushtoken: "null",
                allow: true
            };
            const response = await requesttoBackend('POST', '', data);

            if (!response) {

                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "CreatAppointment()");
                loading.innerText = "VALIDEZ LE RENDEZ-VOUS";

                return false;
            } else if (response.token) {

                sessionStorage.setItem('tirhaka', response.token);

                const splo = response.token.split("°");
                return thisiswhat(`${splo[0]}`);
            } else if (response.ee) {

                alert(`Le ${phonea} est déjà associé à un compte`);
                loading.setAttribute("onclick", "CreatAppointment()");
                loading.innerText = "VALIDEZ LE RENDEZ-VOUS";

                return false;
            }
        } else {

            alert("Les mot de passe ne sont pas conform.");


            return false;
        }
    } else {
        alert("Renseignez tous.");
        return false;
    }
}





async function CreatAppointment() {
    const note = document.getElementById("note").value;
    const userid_rendez = document.getElementById("userid_rendez").value;

    try {

        if (selectedTypeValue && selectedServiceValue && selectedDateValue && selectedTime) {
            const appoint_data_tosent = {
                services: {
                    servicetype: selectedTypeValue,
                    service: selectedServiceValue,
                    availability: true,
                    price: 100,
                },
                message: note,
                statut: "waiting",
                price: 100,
                payment_method: "cash",
                payment_status: "done",
                transaction_id: "transaction_id",
                dete: selectedDateValue,
                heure: selectedTime,
            };

            if (userid_rendez === "pasconnecter") {
                const result = await CreatUser();

                appoint_data_tosent.client = result;
            } else {
                appoint_data_tosent.client = userid_rendez;
                loading.removeAttribute("onclick");
                loading.innerText = "En cours ...";
            };

            const response = await requesttoBackend('POST', 'tirhakaappointmentcreation', appoint_data_tosent);
            if (!response) {
                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "CreatAppointment()");
                loading.innerText = "VALIDEZ LE RENDEZ-VOUS";
            } else if (response) {
                loading.innerText = "RENDEZ-VOUS VALIDÉ";
                window.location.href = "/dashboard";
            }
        }

    } catch (error) {
        console.log(error);
        loading.setAttribute("onclick", "CreatAppointment()");
        loading.innerText = "VALIDEZ LE RENDEZ-VOUS";
    }
}



const RendServicesAdmin = async (service_type) => {
    const serviceshtmlid = document.getElementById('serviceshtmlid');

    // Display loading message
    serviceshtmlid.innerHTML = `<option value="">CHARGEMENT EN COURS...</option>`;

    try {
        const SERVICES = await requesttoBackend('GET', 'tirhakaservicegetting');

        // Filter services based on service_type
        const SERVICES_DATA = SERVICES.filter(tp => tp.servicetype === service_type);

        // Generate options HTML
        const optionsHTML = SERVICES_DATA.length > 0
            ? SERVICES_DATA.map(servic => servic.services.map(ss_ => `<option value="${ss_.service}">${ss_.service}</option>`).join('')).join('')
            : `<option value="">INDISPONIBLE POUR L'INSTANT</option>`;

        // Update select element with options
        serviceshtmlid.innerHTML = `<option value="">SÉLECTIONNER DES SERVICES</option>${optionsHTML}`;
    } catch (error) {
        // Handle error
        serviceshtmlid.innerHTML = `<option value="">échèc, re-selectionnez un type</option>`;
    }
}
