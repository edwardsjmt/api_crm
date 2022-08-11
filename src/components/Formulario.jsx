import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            let respuesta
            if (cliente.id) {
                const url = `http://localhost:5000/clientes/${cliente.id}`;

                respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            } else {
                const url = "http://localhost:5000/clientes";

                respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            console.log(respuesta);
            await respuesta.json();
            navigate("/clientes");
        } catch (error) {
            console.log(error);
        }
    };

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, "El Nombre es muy Corto")
            .max(20, "El Nombre es muy Largo")
            .required("El Nombre del Cliente es Obligatorio"),
        empresa: Yup.string()
            .min(2, "El nombre de la empresa es muy corto")
            .max(40, "El nombre de la empresa es muy largo")
            .required("El nombre de la empresa es obligatorio"),
        telefono: Yup.number()
            .integer("Número no válido")
            .typeError("Número no válido")
            .positive("Número no válido"),
        email: Yup.string()
            .email("E-mail no válido")
            .required("E-mail obligatorio"),
    });
    return cargando ? (
        <Spinner />
    ) : (
        <div className="mt-10 bg-white px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold uppercase text-center text-xl">
                {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "", // Operador ternario
                    empresa: cliente?.empresa ?? "",
                    telefono: cliente?.telefono ?? "",
                    email: cliente?.email ?? "",
                    notas: cliente?.notas ?? "",
                }}
                enableReinitialize={true} // Esta propiedad se utiliza si los valores que inyectaremos en el form vienen de una API o DB
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    return (
                        <Form className="mt-10">
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="nombre"
                                >
                                    Nombre:{" "}
                                </label>
                                <Field
                                    id="nombre"
                                    placeholder="Nombre del Cliente"
                                    type="text"
                                    className="block p-3 mt-2 w-full bg-gray-50 border-2 border-gray-300"
                                    name="nombre"
                                />
                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="empresa"
                                >
                                    Empresa:{" "}
                                </label>
                                <Field
                                    id="empresa"
                                    placeholder="Empresa del Cliente"
                                    type="text"
                                    className="block p-3 mt-2 w-full bg-gray-50 border-2 border-gray-300"
                                    name="empresa"
                                />
                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="telefono"
                                >
                                    Telefono:{" "}
                                </label>
                                <Field
                                    id="telefono"
                                    placeholder="Telefono del Cliente"
                                    type="tel"
                                    className="block p-3 mt-2 w-full bg-gray-50 border-2 border-gray-300"
                                    name="telefono"
                                />
                                {errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="email"
                                >
                                    E-mail:{" "}
                                </label>
                                <Field
                                    id="email"
                                    placeholder="E-mail del cliente"
                                    type="email"
                                    className="block p-3 mt-2 w-full bg-gray-50 border-2 border-gray-300"
                                    name="email"
                                />
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="nombre"
                                >
                                    Notas:{" "}
                                </label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    placeholder="Observaciones"
                                    type="text"
                                    className="block p-3 mt-2 w-full bg-gray-50 border-2 border-gray-300 h-40"
                                    name="notas"
                                />
                            </div>

                            <input
                                type="submit"
                                className="bg-blue-800 mt-5 w-full p-3 text-white"
                                value={
                                    cliente?.nombre
                                        ? "Editar Cliente"
                                        : "Registrar Cliente"
                                }
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false,
};

export default Formulario;
