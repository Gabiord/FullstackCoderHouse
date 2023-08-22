import ItemListContainer from "./ItemListContainer"
import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./ItemDetailContainer";
import Carrito from "./Carrito";
import LandingPage from "./LandingPage"
import TrackingPage from "./TrackingPage";
import SessionPage from "./SessionPage"
import Chat from "./Chat"
import Administrador from "./Administrador";
import ResetPassword from "./ResetPassword";
import SendMailToResetPassword from "./SendMailToResetPassword";

function Main(children) {

    return (
        <main>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/products" element={<ItemListContainer />} />
                <Route path="products/category/:id" element={<ItemListContainer />} />
                <Route path="/products/:id" element={<ItemDetailContainer />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/tracking/:id" element={<TrackingPage />} />
                <Route path="/session" element={<SessionPage/>} />
                <Route path="/chat" element={<Chat children= {children}/>} />
                <Route path="/admin/users" element= {<Administrador/>} />
                <Route path="/resetpassword/" element= {<SendMailToResetPassword/>} />
                <Route path="/resetpassword/:token" element= {<ResetPassword/>} />
            </Routes>
        </main>
    )
}

export default Main;