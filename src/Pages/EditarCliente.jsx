import Formulario from "../components/Formulario";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditarCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const consultarAPI = async function () {
            try {
                const url = `http://localhost:5000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
        setCargando(!cargando);
        };
        consultarAPI();
    }, []);
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">
                Utiliza este formulario para para editar un cliente
            </p>
            <Formulario 
                cliente={cliente}
                cargando={cargando}
            />
        </>
    );
};

export default EditarCliente;
