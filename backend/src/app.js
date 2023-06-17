import Express from "express";
import __dirname from "./utils.js";

const app = Express();


//Imports de Rutas
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import messagesRoutes from "./routes/message.routes.js"
import sessionRoutes from "./routes/sessions.routes.js"



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
const PORT = 8080;
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



//Declaraciones Router
app.use("/api/sessions", sessionRoutes)
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/messages", messagesRoutes);

