import ItemListContainer from "./ItemListContainer"
import { Routes, Route } from "react-router-dom";
import ItemDetailContainer from "./ItemDetailContainer";
import Carrito from "./Carrito";
import LandingPage from "./LandingPage"
import TrackingPage from "./TrackingPage";
import SessionPage from "./SessionPage"
import Chat from "./Chat"
import Administrador from "./AdministradorProductos";

function Main() {
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
                <Route path="/chat" element={<Chat/>} />
                <Route path="/administrador" element= {<Administrador/>} />
            </Routes>
        </main>
    )
}

export default Main;