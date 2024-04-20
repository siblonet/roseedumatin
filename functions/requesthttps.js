const requesttoBackend = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(Baseurl + endpoint, options);
    if (!response.ok) {
        return false
    }
    try {
        const responseData = await response.json();

        return responseData;
    } catch (error) {
        return [];
    }

};

