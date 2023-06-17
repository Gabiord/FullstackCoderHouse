import { useState } from "react"
import { useContext } from "react"
import { createContext } from "react"

import Cookies from "universal-cookie";
import jwt from "jwt-decode"

const context = createContext()
const Provider = context.Provider

export const useUser = () => {
    const valor = useContext(context)
    return valor
}

const UserContext = ({ children }) => {

    //Inicializando Cookies
    const cookies = new Cookies();
    const [user, setUser] = useState({})

    const verificarCookie = () =>{
        const cookie = cookies.get("jwtCookieToken")
        setUser(cookie)
        console.log(cookie)
    }

    const valorDelContexto = {
        user,
        setUser
    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    )

}   

export default UserContext;



