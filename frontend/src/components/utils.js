
const accessToken= "jwtCookieToken"

export function getToken(){
    const verif = window.localStorage.getItem(accessToken)
    return verif
} 

