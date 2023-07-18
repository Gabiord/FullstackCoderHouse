import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from "dotenv";
import {faker} from "@faker-js/faker"



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// Generamos password
const salt = bcrypt.genSaltSync(10);
export const createHash = password => bcrypt.hashSync(password,salt)


//Validamos la contraseña con la que esta en la BD
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password) // esto devuelve un true o falso
}


// Implementacion de JsonWebToken
export const generateJWToken = (prop) => {
    return jwt.sign({prop}, process.env.PRIVATE_KEY, {expiresIn: "1h"});
}


// para manejo de errores
export const passportCall = (strategy) => {
    return async (request, response, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) return next(error);
            if (!user) {
                return response.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            request.user = user;
            next();
        })(request, response, next);
    }
};

// para manejo de Auth
export const authorization = (role) => {
    return async (request, response, next) => {
        if (!request.user) return response.status(401).send("Unauthorized: User not found in JWT"); 
        if (request.user.role !== role) {
            return response.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
        }
        next();
    }
};

//FAKER
//Idioma de datos
faker.locale = 'es';

export const generateProduct = () => {
    return{
        product_name: faker.commerce.productName(),
        product_description: faker.commerce.productDescription(),
        product_price: faker.commerce.price({ min: 100, max: 200, dec: 0 }), // Ver porque devuelve Na
        product_category: faker.commerce.productAdjective() ,
        product_code: faker.random.numeric(10),
        product_thumbnail: faker.image.image(),
        product_stock: faker.random.numeric(2) ,
        product_status: true
    }
}