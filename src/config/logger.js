import winston from "winston";
import config from "./config.js";

const customLevelOptions = {
    leves: {
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5},

    colors:{
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "white"
    }        
}

//Loggers

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({ 
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({level: "info",        
            format: winston.format.combine(
            winston.format.colorize({colors: customLevelOptions.colors}),
            winston.format.simple()
        )}),
        new winston.transports.File({filename:"./errors.log", level:"error",         format: winston.format.combine(
            winston.format.colorize({colors: customLevelOptions.colors}),
            winston.format.simple()
        )}),

    ]
})

export const addLogger = (request, response, next) => {

    if (config.environment === 'production'){
        request.logger = prodLogger;
    }else{
        request.logger = devLogger;
    }
     
    request.logger.info(`${request.method} sj ${request.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);

    next();
}