import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {

    const [empleados, setEmpleados] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const resultado = await axios.get("http://localhost:8080/empleados");
        setEmpleados(resultado.data);
    }

    const comprobacionEliminar = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                eliminarEmpleado(id);
            }
        })

    }

    const eliminarEmpleado = async id => {
        await axios.delete(`http://localhost:8080/empleado/${id}`);
        cargarEmpleados();
    }

    return (
        <div className="container ">
            <div className="py-4">
                <table className="table table-striped border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Email</th>
                            <th scope="col">RFC</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empleados.map((empleado) => (
                                <tr key={empleado.id}>
                                    <th scope="row">{empleado.id}</th>
                                    <td>{empleado.nombre + " " + empleado.apellido}</td>
                                    <td>{empleado.email}</td>
                                    <td>{empleado.rfc}</td>
                                    <td>
                                        <button className="btn btn-primary mx-2">Mostrar</button>
                                        <Link className="btn btn-outline-primary mx-2" to={`/editarEmpleado/${empleado.id}`}>Editar</Link>
                                        <button className="btn btn-danger mx-2"
                                            onClick={() => comprobacionEliminar(empleado.id)}
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;