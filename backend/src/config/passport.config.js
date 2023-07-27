import passport from "passport";    
import userModel from "../services/db/models/users.js"; 
import jwtStrategy from "passport-jwt";
import GitHubStrategy from "passport-github2";
import userDTO from "../services/dto/user.dto.js";
import { request } from "express";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractorJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {

    //Estrategia de obtener Token JWT
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractorJWT.fromExtractors([headerExtractor]),
            secretOrKey: process.env.PRIVATE_KEY
        },
        async(jwt_payload, done)=>{
            try {
                const datos = new userDTO(jwt_payload)
                return done(null, datos)
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    //Estrategia de obtener Token JWT (Para reestablecer contraseña)
    passport.use('jwtReset', new JwtStrategy(
        {
            jwtFromRequest: ExtractorJWT.fromUrlQueryParameter("token"),
            secretOrKey: process.env.PRIVATE_KEY
        },
        async(jwt_payload, done)=>{
            try {
                const datos = new userDTO(jwt_payload)
                return done(null, datos)
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    //Estrategia de login con Github:
    passport.use("github",new GitHubStrategy({
        clientID: "Iv1.d0a5569b4dd681fb",
        clientSecret: "764bd8d3e0f8d812b3959c35f7607d92ec83bf11",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        },async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ email: profile._json.email });
                    if (!user) {
                      let newUser = {
                        first_name: profile._json.name,
                        last_name: "",
                        email: profile._json.email,
                        age: 0,
                        password: "",
                        loggedBy: "Github",
                      };
                        const result = await userModel.create(newUser);
                        done(null, result);
                    } else {
                        done(null, user);
                    }      
            } catch (error) {
                return done(error)
            }
    }));
    
    //funcion de serializacion
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    //funcion de desearlizacion
    passport.deserializeUser(async(id, done)=>{
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            return done(error)
        }
    })
}

// funcion para extraer el header
const headerExtractor = request =>{

    let token = null;
    const encabezadoAutorizacion = request.headers.authorization;

    if (encabezadoAutorizacion) {
        console.log(encabezadoAutorizacion)
      const partesEncabezado = encabezadoAutorizacion.split(" ");
      if (partesEncabezado.length === 2 && partesEncabezado[0] === 'Bearer') {
        token = partesEncabezado[1];
      }
    }
    return token;
}

export default initializePassport;

