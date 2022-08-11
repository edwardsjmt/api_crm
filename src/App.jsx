import { Route, Routes, BrowserRouter } from "react-router-dom";
import NuevoCliente from "./Pages/NuevoCliente"
import EditarCliente from "./Pages/EditarCliente"
import VerCliente from "./Pages/VerCliente"
import Layout from "./Layout/Layout"
import Inicio from "./Pages/Inicio"

const App = () => {
    return (
        <div>
            <BrowserRouter>
				<Routes>
					<Route path="/clientes" element={<Layout />} >
						<Route index element={<Inicio />} />
						<Route path="nuevo" element={<NuevoCliente/>} />
						<Route path="editar/:id" element={<EditarCliente/>} />
						<Route path=":id" element={<VerCliente/>} />
					</Route>
				</Routes>
			</BrowserRouter>
        </div>
    );
};

export default (App)