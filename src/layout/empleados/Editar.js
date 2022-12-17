import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Editar = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const [empleado, setEmpleado] = useState({
        nombre: "",
        apellido: "",
        email: "",
        rfc: ""
    });

    const { nombre, apellido, email, rfc } = empleado;

    const onInputChange = e => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/empleado/${id}`, empleado);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Empleado Editado',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            navigate("/");
        }, 1700)
    }

    useEffect(() => {
        cargarEmpleado();
    }, [])

    const cargarEmpleado = async () => {
        const resultado = await axios.get(`http://localhost:8080/empleado/${id}`)
        setEmpleado(resultado.data);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className="text-center m-4">Editar Empleado</h3>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" placeholder="Tu nombre" name="nombre" value={nombre} onChange={e => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" placeholder="Tu apellido" name="apellido" value={apellido} onChange={e => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder="Tu email" name="email" value={email} onChange={e => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rfc" className="form-label">RFC</label>
                            <input type="text" className="form-control" placeholder="Tu RFC" name="rfc" value={rfc} onChange={e => onInputChange(e)} />
                        </div>
                        <button type="submit" className="btn btn-outline-success">Editar</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Editar;