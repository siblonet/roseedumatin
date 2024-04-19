async function PostArticle(articles) {
    const articldb = await openArticleDatabase();
    const PATransation = articldb.transaction(["ArticleStore"], "readwrite");
    const PAStore = PATransation.objectStore("ArticleStore");

    let added = false;
    articles.map(article => {
        const adding = PAStore.add(article);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostArticle", event.target.error);
        };

    });

    return added
}


async function PostPannier(panier) {
    const panierdb = await openPannierDatabase();
    const PPTransation = panierdb.transaction(["PannierStore"], "readwrite");
    const PPStore = PPTransation.objectStore("PannierStore");

    let added = false;
    const adding = PPStore.add(panier);

    adding.onsuccess = () => {
        added = true;
    };

    adding.onerror = (event) => {
        console.log("PostPannier", event.target.error);
    };


    return added
}


async function PostOrder(orders) {
    const orderdb = await openOrdersDatabase();
    const POTransation = orderdb.transaction(["OrderdStore"], "readwrite");
    const POStore = POTransation.objectStore("OrderdStore");


    let added = false;
    orders.map(order => {
        const adding = POStore.add(order);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostOrder", event.target.error);
        };

    });

    return added
}

async function PostPeople(people) {
    const peopledb = await openPeopleDatabase();
    const PpTransation = peopledb.transaction(["PeopleContent"], "readwrite");
    const PpStore = PpTransation.objectStore("PeopleContent");

    let added = false;
    people.map(person => {
        const adding = PpStore.add(person);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostPeople", event.target.error);
        };

    });

    return added
}


async function PostSettings(settingdata) {
    const settingdb = await openSettingsDatabase();
    const PSTransation = settingdb.transaction(["SettingStore"], "readwrite");
    const PSStore = PSTransation.objectStore("SettingStore");

    let added = false;
    settingdata.map(satting => {
        const adding = PSStore.add(satting);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostSettings", event.target.error);
        };

    });

    return added
}

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function GetArticle(what = null) {
    const articldb = await openArticleDatabase();
    const GATransation = articldb.transaction(["ArticleStore"], "readonly");
    const GAStore = GATransation.objectStore("ArticleStore");

    return new Promise((resolve, reject) => {
        const articles = [];

        GAStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                articles.push(cursor.value);
                cursor.continue();
            } else if (what == "avail") {
                const avails = [];
                for (const avail of articles) {
                    avail.quantity > 0 ? avails.push(avail) : null
                }
                resolve(avails);

            } else if (what == "zero") {
                const zeros = [];
                for (const zero of articles) {
                    zero.quantity < 1 ? zeros.push(zero) : null
                }
                resolve(zeros);
            } else {

                resolve(articles);
            }
        };

        GATransation.onerror = (event) => {
            reject("Transaction error: " + event.target.errorCode);
        };
    });

}

async function GetArticleByID(id) {
    return new Promise(async (resolve, reject) => {
        const articldb = await openArticleDatabase();
        const GATransation = articldb.transaction(["ArticleStore"], "readonly");
        const GAStore = GATransation.objectStore("ArticleStore");

        const requestingByID = GAStore.get(id);

        requestingByID.onsuccess = (event) => {
            const article = event.target.result;
            resolve(article);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetArticleByID store:", event.target.error);
            reject(event.target.error);
        };
    });
}


async function GetPannier() {
    const panierdb = await openPannierDatabase();
    const GPTransation = panierdb.transaction(["PannierStore"], "readonly");
    const GPStore = GPTransation.objectStore("PannierStore");
    return new Promise((resolve, reject) => {
        const pannier = [];

        GPStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                pannier.push(cursor.value);
                cursor.continue();
            } else {
                resolve(pannier);
            }
        };

        GPTransation.onerror = (event) => {
            console.log("GetPannier error: " + event.target.errorCode);
            reject([]);
        };
    });

}

async function GetPannierToSend(order) {
    const panierdb = await openPannierDatabase();
    const GPTransation = panierdb.transaction(["PannierStore"], "readonly");
    const GPStore = GPTransation.objectStore("PannierStore");
    return new Promise((resolve, reject) => {

        GPStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                order.articles.push({
                    arti_id: cursor.value._id,
                    quantcho: cursor.value.quantcho,
                    prix: cursor.value.prix
                });
                
                order.reduction += cursor.value.prix * cursor.value.quantcho
                cursor.continue();
            } else {
                resolve(order);
            }
        };

        GPTransation.onerror = (event) => {
            console.log("GetPannier error: " + event.target.errorCode);
            reject(false);
        };
    });

}

async function GetPannierByID(id) {
    return new Promise(async (resolve, reject) => {
        const panierdb = await openPannierDatabase();
        const GPTransation = panierdb.transaction(["PannierStore"], "readonly");
        const GPStore = GPTransation.objectStore("PannierStore");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const pannier = event.target.result;
            resolve(pannier);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetPannierByID store:", event.target.error);
            reject(false);
        };
    });
}



async function GetPeople(who = null) {
    const peopledb = await openPeopleDatabase();
    const GPTransation = peopledb.transaction(["PeopleContent"], "readonly");
    const GPStore = GPTransation.objectStore("PeopleContent");

    return new Promise((resolve, reject) => {
        const peoples = [];

        GPStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                peoples.push(cursor.value);
                cursor.continue();
            } else if (who == "person") {
                const persons = [];
                for (const person of peoples) {
                    person.nom !== "Anony" ? persons.push(person) : null
                }
                resolve(persons);

            } else if (who == "Anony") {
                const personsa = [];
                for (const persona of peoples) {
                    persona.nom == "Anony" ? personsa.push(persona) : null
                }
                resolve(personsa);
            } else {

                resolve(peoples);
            }
        };

        GPTransation.onerror = (event) => {
            reject("GetPeople Transaction error: " + event.target.errorCode);
        };
    });


}

async function GetPersonByID(id) {
    return new Promise(async (resolve, reject) => {
        const peopledb = await openPeopleDatabase();
        const GPTransation = peopledb.transaction(["PeopleContent"], "readonly");
        const GPStore = GPTransation.objectStore("PeopleContent");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const personphone = event.target.result;
            resolve(personphone);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetPersonByID store:", event.target.error);
            reject(event.target.error);
        };
    })



}



async function GetOrder() {
    const orderdb = await openOrdersDatabase();
    const GOTransation = orderdb.transaction(["OrderdStore"], "readonly");
    const GOStore = GOTransation.objectStore("OrderdStore");


    return new Promise((resolve, reject) => {
        const orders = [];

        GOStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                orders.push(cursor.value);
                cursor.continue();
            } else {
                resolve(orders);
            }
        };

        GOTransation.onerror = (event) => {
            reject("GetOrder Transaction error: " + event.target.errorCode);
        };
    });

}

async function GetOrderByID(id) {
    return new Promise(async (resolve, reject) => {
        const orderdb = await openOrdersDatabase();
        const GOTransation = orderdb.transaction(["OrderdStore"], "readonly");
        const GOStore = GOTransation.objectStore("OrderdStore");
        const requestingByID = GOStore.get(id)

        requestingByID.onsuccess = (event) => {
            resolve(event.target.result);
        };

        requestingByID.onerror = (event) => {
            reject("Error accessing object GetOrderByID store:", event.target.error);
        };

    });

}


async function GetSettings() {
    const settingdb = await openSettingsDatabase();
    const GSTransation = settingdb.transaction(["SettingStore"], "readonly");
    const GSStore = GSTransation.objectStore("SettingStore");
    return new Promise((resolve, reject) => {
        const sattings = [];

        GSStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                sattings.push(cursor.value);
                cursor.continue();
            } else {
                resolve(sattings);
            }
        };

        GSTransation.onerror = (event) => {
            console.log("GetSettings error: " + event.target.errorCode);
            reject([]);
        };
    });

}

async function GetSettingsByID(id) {
    return new Promise(async (resolve, reject) => {
        const settingdb = await openSettingsDatabase();
        const GSTransation = settingdb.transaction(["SettingStore"], "readonly");
        const GSStore = GSTransation.objectStore("SettingStore");

        const requestingByID = GSStore.get(id);

        requestingByID.onsuccess = (event) => {
            const sattings = event.target.result;
            resolve(sattings);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetSettingsByID store:", event.target.error);
            reject(false);
        };
    });
}

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ update systme as put start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function PutPannier(pannier) {
    return new Promise(async (resolve, reject) => {
        const panierdb = await openPannierDatabase();
        const PuPTransation = panierdb.transaction(["PannierStore"], "readwrite");
        const PuPStore = PuPTransation.objectStore("PannierStore");

        const update = PuPStore.put(pannier);

        update.onsuccess = () => {
            resolve(true);
        };

        update.onerror = (event) => {
            console.error("Error accessing object PutPannier store:", event.target.error);
            reject(false);
        };
    });
}


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ update systme as put ends @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function deleteArticle() {
    const articldb = await openArticleDatabase();
    const CATransation = articldb.transaction(["ArticleStore"], "readwrite");
    const CAStore = CATransation.objectStore("ArticleStore");

    const clearArtbyid = CAStore.clear();

    let deleted = false;
    clearArtbyid.onsuccess = () => {
        deleted = true;
    };

    clearArtbyid.onerror = (event) => {
        console.error("Error accessing object deleteArticle store:", event.target.error);
    };

    return deleted
}


async function deletePannier() {
    const panierdb = await openPannierDatabase();
    const CPTransation = panierdb.transaction(["PannierStore"], "readwrite");
    const CPStore = CPTransation.objectStore("PannierStore");

    const clearPannier = CPStore.clear();

    let deleted = false;
    clearPannier.onsuccess = () => {
        deleted = true;
    };

    clearPannier.onerror = (event) => {
        console.error("Error accessing object deletePannier store:", event.target.error);
    };

    return deleted
}

async function deletePannierByID(id) {
    const panierdb = await openPannierDatabase();
    const DPTransation = panierdb.transaction(["PannierStore"], "readwrite");
    const DPStore = DPTransation.objectStore("PannierStore");

    const deleteArtbyid = DPStore.delete(id);

    let deleted = false;
    deleteArtbyid.onsuccess = () => {
        deleted = true;
    };

    deleteArtbyid.onerror = (event) => {
        console.error("Error accessing object deletePannier store:", event.target.error);
    };

    return deleted
}



async function deletePeople() {
    const peopledb = await openPeopleDatabase();
    const CPTransation = peopledb.transaction(["PeopleContent"], "readwrite");
    const CPStore = CPTransation.objectStore("PeopleContent");

    const clearPeople = CPStore.clear();

    let deleted = false;
    clearPeople.onsuccess = () => {
        deleted = true;
    };

    clearPeople.onerror = (event) => {
        console.error("Error accessing object deletePeople store:", event.target.error);
    };

    return deleted
}



async function deleteOrder() {
    const orderdb = await openOrdersDatabase();
    const COTransation = orderdb.transaction(["OrderdStore"], "readwrite");
    const COStore = COTransation.objectStore("OrderdStore");
    const clearOrderbyid = COStore.clear();

    let deleted = false;
    clearOrderbyid.onsuccess = () => {
        deleted = true;
    };

    clearOrderbyid.onerror = (event) => {
        console.error("Error accessing object deleteOrder store:", event.target.error);
    };

    return deleted
}

async function deleteSetting() {
    const sattingdb = await openSettingsDatabase();
    const CSTransation = sattingdb.transaction(["SettingStore"], "readwrite");
    const CSStore = CSTransation.objectStore("SettingStore");

    const clearSettings = CSStore.clear();

    let deleted = false;
    clearSettings.onsuccess = () => {
        deleted = true;
    };

    clearSettings.onerror = (event) => {
        console.error("Error accessing object deleteSetting store:", event.target.error);
    };

    return deleted
}

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */