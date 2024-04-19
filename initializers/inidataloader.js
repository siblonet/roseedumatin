async function initDataLoader() {
    try {
        const online = await requesttoBackend('GET', 'tirhakaservicegetting');
        console.log(online);

    } catch (error) {
        console.log(error)
    }

};

initDataLoader();