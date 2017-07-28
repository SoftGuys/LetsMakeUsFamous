/* globals $ */
const requester = (() => {
    const request = (url,
        method,
        contentType = '',
        body = {},
        headers = {}) => {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: method,
                data: JSON.stringify(body),
                contentType: contentType,
                headers: headers,
                success: (data) => resolve(data),
                error: (err) => reject(err),
            });
        });

        return promise;
    };

    const putJSON = (url, body, headers = {}) => {
        return request(url, 'PUT', 'application/json', body, headers);
    };

    const postJSON = (url, body, headers = {}) => {
        return request(url, 'POST', 'application/json', body, headers);
    };

    const getJSON = (url, headers = {}) => {
        return request(url, 'GET', 'application/json', {}, headers);
    };

    const deleteJSON = (url, body = {}, headers = {}) => {
        return request(url, 'DELETE', 'application/json', body, headers);
    };

    return {
        postJSON,
        putJSON,
        getJSON,
        deleteJSON,
    };
})();
