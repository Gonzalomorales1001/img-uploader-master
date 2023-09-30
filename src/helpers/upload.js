const URL = 'https://ium-jqb0-dev.fl0.io/img/upload'
const localhost = 'http://localhost:1001/img/upload'

export const upload = async (data) => {
    const resp = await fetch(URL, {
        method: "POST",
        body: data
    });

    const info = await resp.json();
    return info;
}