import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = 'http://192.168.60.152:8001/mascotas';


const Blank = () => {
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        getMascotas();
    }, []);

    const getMascotas = async () => {
        try {
            const response = await axios.get("http://192.168.60.152:8001/mascotas");
            console.log(response.data)
            setMascotas(response.data.data);
        } catch (error) {
            console.error("Error fetching mascotas:", error);
        }
    };

    const deleteMascota = async (mascota_id) => {
        try {
            await axios.delete(`${url}/${mascota_id}`);
            getMascotas();
        } catch (error) {
            console.error("Error deleting mascota:", error);
        }
    };
    
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <Link to="/create" className="btn btn-dark">
                            Añadir
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Raza</th>
                                    <th>Edad</th>
                                    <th>Tamaño</th>
                                    <th>Descripción</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
    {mascotas.map((mascota, index) => (
        <tr key={mascota.mascota_id}>
            <td>{index + 1}</td>
            <td>{mascota.nombre}</td>
            <td>{mascota.especie}</td>
            <td>{mascota.raza}</td>
            <td>{mascota.edad}</td>
            <td>{mascota.tamaño}</td>
            <td>{mascota.descripcion}</td>
            <td>
                <Link
                    to={`/edit/${mascota.mascota_id}`}
                    className="btn btn-warning"
                >
                    Editar
                </Link>{" "}
                <button className="btn btn-danger" onClick={() => deleteMascota(mascota.mascota_id)}>
                                Eliminar
                            </button>
            </td>
        </tr>
    ))}
</tbody>


                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Blank