import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('--persist <mode>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'development')

program.parse();

console.log("Options: ", program.opts());

console.log("Environment Mode Option: ", program.opts().mode);
console.log("Persistence Mode Option: ", program.opts().persist);

const environment = program.opts().mode;

dotenv.config({
    path:
      environment === "production"
        ? "./src/config/.env.production"
        : "./src/config/.env.development"
});
  

export default {
    environment: process.env.ENVIRONMET,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD
};