const request = ({ url, method = 'GET', params }) => {
    let options = { method, headers: {
        'Content-Type': 'application/json',
    }, };
    if(params){
        options = {
            ...options,
            body: JSON.stringify(params)
        };
    }
    return fetch(url, options).then(res => {
        if(!res.ok){
            return Promise.reject(res.status);
        }
        return res.json();
    });
};

export default request;