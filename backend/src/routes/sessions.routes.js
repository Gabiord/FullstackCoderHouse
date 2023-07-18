import { Router} from "express";
import * as sessionsController from "../controllers/sessions.controller.js";
import passport from "passport";
import { passportCall, authorization} from "../utils.js";
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser()); 

//RENDERIZADO DE VISTAS

router.get("/", sessionsController.renderLogin);

router.get("/register", sessionsController.renderRegistrer);

router.get("/fail-register", sessionsController.renderFailRegistrer);

router.get("/fail-login", sessionsController.renderFailLogin);

router.get("/githubsession",sessionsController.renderLoginGithub)

router.get("/current", 
    passportCall('jwt'),  
    sessionsController.sessionCurrent
)

router.get("/logout", sessionsController.logoutUser);

router.get("/administrador",
    passportCall('jwt'),
    authorization("admin"),  
    sessionsController.administrador
)


//POSTS 

router.post("/login",sessionsController.loginUser);

router.post("/register", sessionsController.saveNewUser);

router.post("/resetpassword", sessionsController.sendMailToRecoverPassword);

router.post("/resetpassword/:token", passportCall('jwtReset'), sessionsController.recoverPassword)
 

// PARA LOGINS CON GITHUB

router.get("/github", passport.authenticate('github',{scope:['user:email']}), async(request, response)=>{})

router.get("/githubcallback",passport.authenticate('github',{failureRedirect:"/fail-login"}), sessionsController.githubLogin)


export default router;
