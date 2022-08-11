import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner"

const VerCliente = () => {
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
        cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? (
        "No hay resultados."
    ) : (
        <div>
                <>
                    <h1 className="font-black text-4xl text-blue-900">
                        Ver Cliente: {cliente.nombre}
                    </h1>
                    <p className="mt-3">Informacion del Cliente</p>
                    {cliente.nombre && (
                        <p className="text-2xl text-gray-600 mt-10 ">
                            <span className="text-gray-800 font-bold uppercase">
                                Nombre:{" "}
                            </span>
                            {cliente.nombre}
                        </p>
                    )}

                    {cliente.telefono && (
                        <p className="text-2xl text-gray-600 mt-4 ">
                            <span className="text-gray-800 font-bold uppercase">
                                Telefono:{" "}
                            </span>
                            {cliente.telefono}
                        </p>
                    )}

                    {cliente.email && (
                        <p className="text-2xl text-gray-600 mt-4 ">
                            <span className="text-gray-800 font-bold uppercase">
                                E-mail:{" "}
                            </span>
                            {cliente.email}
                        </p>
                    )}

                    {cliente.empresa && (
                        <p className="text-2xl text-gray-600 mt-4 ">
                            <span className="text-gray-800 font-bold uppercase">
                                Empresa:{" "}
                            </span>
                            {cliente.empresa}
                        </p>
                    )}

                    {cliente.notas && (
                        <p className="text-2xl text-gray-600 mt-4 ">
                            <span className="text-gray-800 font-bold uppercase">
                                Notas:{" "}
                            </span>
                            {cliente.notas}
                        </p>
                    )}
                </>

        </div>
    ))
};

export default VerCliente;
