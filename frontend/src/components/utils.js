import axios from "axios";

const accessToken= "jwtCookieToken"

export function getToken(){
    const verif = window.localStorage.getItem(accessToken)
    return verif
}

export function initAxiosInterceptors(){
    axios.interceptors.request.use(function(config){
        const token = getToken();
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

}