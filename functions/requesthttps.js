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
    const responseData = await response.json();

    if (!response.ok) {
        return false
    }

    return responseData;
};

