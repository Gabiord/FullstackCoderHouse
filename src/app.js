import Express from "express";
import __dirname from "./utils.js";

const app = Express();

//Imports de Rutas
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import messagesRoutes from "./routes/message.routes.js"
import sessionRoutes from "./routes/sessions.routes.js"
import emailRoutes from "./routes/email.routes.js"
import performanceTestRoutes from "./routes/performanceTestRoutes.js"
import usersRoutes from "./routes/users.routes.js"

//Configuracion de Base de datos
import MongoSingleton from "./config/mongdb-singleton.js";

const MongoInstance = async () => {
  try{
      await MongoSingleton.getInstance();
  }catch(error){
      console.error(error)
  }
}

MongoInstance();


//Imports de passport
import passport from 'passport';
import initializePassport from './config/passport.config.js';


//importacion de cors 
import cors from 'cors'; 
app.use(cors());


//Configuracion Servidor
const PORT = process.env.PORT||8080;
const httpServer = app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});



//Configuracion de Sockets 
import { Server } from "socket.io";
import * as MessagesController from "./controllers/messages.controller.js";

const socketServer = new Server(httpServer);

socketServer.on("connection", async(socket) => {
  console.log("Nuevo cliente conectado");

  //para renderizar los productos
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)

  //para cargar un nuevo producto
  socket.on("newProduct", async (data) => {
    let newProduct = data;
    await productManager.addProduct(newProduct);
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)
  });

  //Para eliminar un producto
  socket.on("deleteProductID", async (data) => {
    await productManager.deleteProduct(data);
    const totalProducts = await productManager.getProducts();
    socket.emit("totalProducts",totalProducts)
  });

  socket.on('newMessage', async (data) => {
    await MessagesController.saveNewMessage(data);
    const totalMessages = await MessagesController.getAllMessages();
    socket.emit("totalMessages", totalMessages)
  })

});

//Imports y config de Swagger
import swaggerJSDOC from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

const swaggerOptions = {
  definition : {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion Proyecto Backend',
      description: 'Gabriela Ordoñez'    }
  },
  apis: [`./src/docs/**/*.yaml`]
}
// Creamos el specs  y declaramos swager API - ENPOINT
const specs = swaggerJSDOC(swaggerOptions);

app.use("/apidocs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs))


//Configuracion para sesiones
import MongoStore from "connect-mongo";
import session from "express-session";
app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
      ttl: 45
      }),
  secret: "thesecret",
  resave: false,
  saveUninitialized: true
}))



//Middlewares Passport
initializePassport();
app.use(passport.initialize());


//Configuracion Postman
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));


//configuracion de HBS
import handlebars from "express-handlebars";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views/");
app.set("view engine", "handlebars");


//Configuracion para utilizar carpeta public
app.use(Express.static(__dirname + "/public"));


//Midleware de Logger
app.use(addLogger);

//Declaraciones Router
app.use("/api/users", usersRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/email", emailRoutes);
app.use("/test", performanceTestRoutes);



//Faker 
import { mockingProducts } from "./controllers/mockingProducts.controller.js";
import { addLogger } from "./config/logger.js";

app.use("/api/mockingproducts", mockingProducts);


//Logger 

app.use("/loggertest", (request, response) => {

  request.logger.error("Prueba de log level error!");
  request.logger.warn("Prueba de log level warning!");
  request.logger.info("Prueba de log level info!");
  request.logger.http("Prueba de log level http!");
  request.logger.debug("Prueba de log level debug!");

  response.send("Test de logger!");
});




