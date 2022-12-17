import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Agregar = () => {

    let navigate = useNavigate();

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
        await axios.post("http://localhost:8080/empleado", empleado);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Empleado agregado',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            navigate("/")
        }, 1700)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h3 className="text-center m-4">Agregar Empleado</h3>
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
                        <button type="submit" className="btn btn-outline-success">Agregar</button>
                        <Link className="btn btn-outline-danger mx-2" to="/">Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Agregar;