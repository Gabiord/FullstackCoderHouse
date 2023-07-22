import { generateJWToken, isValidPassword, createHash, passportCall } from "../utils.js";
import { buscarenBD, crearNuevoUsuario, editarContraseña } from "../services/db/sessions.service.js";
import cartService from "../services/db/cart.service.js"
import userDTO from "../services/dto/user.dto.js";
import { LocalStorage } from 'node-localstorage';
import { json } from "express";
import jwt  from "jsonwebtoken";
import { sendEmailRecoverPassword } from "./email.controller.js";

const CartService = new cartService()
const localStorage = new LocalStorage('./tokens')

//RENDERIZADO DE VISTAS

export function renderLogin(request, response){response.render("login")}

export function renderRegistrer(request, response){response.render("register")}

export function renderFailRegistrer(request, response){response.render("fail-register")}

export function renderFailLogin(request, response){response.render("fail-login")}

export function renderLoginGithub(request, response){response.render("github-login")}

export function sessionCurrent(request, response){
    const sessionUser = request.user
    const sessionAdmin =false
    response.status(200).json(sessionUser)
}

export async function logoutUser(request, response){
    response.clearCookie("jwtCookieToken").redirect("/api/sessions/")
}

export async function administrador(request, response){
    response.render("administrador")
}


// POSTS

export async function loginUser(request, response){
    const {email, password} = request.body;

    try {
        const user = await buscarenBD(email)

        if(!user){return response.status(400).json({message: "Credenciales Incorrectas"})}
        if(!isValidPassword(user, password)){return response.status(400).json({message: "Credenciales Incorrectas"})}
        
        const accessToken = generateJWToken(user)
        response.status(200).json(accessToken)
    
    } catch (error) {
       response.status(400).json(error.message)
    }
}

export async function saveNewUser(request,response){

    try {
        const {first_name, last_name, age, email, password} = request.body;

        const verif = await buscarenBD(email)
        if(verif){return response.json({message: "el email ya esta en uso"})}

        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password)
        }

        const user = await crearNuevoUsuario(newUser)
    
        const cart = await CartService.createNewCart(user._id)
        
        response.status(200).json(user)

    } catch (error) {
        response.status(400).json(error.message)
    }
}

export async function sendMailToRecoverPassword(request, response){
    try {
        const {email} = request.body;
        const verif = await buscarenBD(email)
        if(!verif){return response.json({message: "el usuario no existe"})}
        const tokenUnico=generateJWToken(email)

        const datos = {
            token: tokenUnico,
            emailToRecover : email
        }

        await sendEmailRecoverPassword(datos)
        
        response.status(200).json(datos.tokenUnico)

    } catch (error) {
        response.status(400).json(error.message)
    }
}    

export async function recoverPassword(request, response){
    const userToken = request.params.token;
    const newPass = request.body.newPass;
    const hashPass = createHash(newPass)

    try {
        const decodedToken = jwt.verify(userToken, process.env.PRIVATE_KEY);
        const completeUser = buscarenBD(decodedToken)
        console.log(completeUser)
        const user = await editarContraseña(completeUser._id, hashPass)
        console.log(user)

        response.status(200).json({message: "Contraseña cambiada"})

    } catch (error) {
        console.error(error)
    }


}


// PARA LOGINS CON GITHUB

export async function githubLogin(request, response){
    const user = request.user;
    try {
        const userToken= {
            name:  `${user.first_name} ${user.last_name}`,
            email: `${user.email}`,
            age: `${user.age}`,
            role: `${user.role}`
        }
        const accessToken = generateJWToken(userToken)
        response.status(200).json(user)
    } catch (error) {
        console.error(error)
    }
    
    response.status(200).json(user)
}