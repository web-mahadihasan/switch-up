const getSavedPassword = (key) => {
    const data = localStorage.getItem(key)
    if(data){
        return JSON.parse(data)
    }else{
        return "";
    }
}

const setSavePassword = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}


export {getSavedPassword, setSavePassword}