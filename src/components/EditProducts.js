import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = 'https://terra-ogo9.onrender.com';

const EditMascotas = () => {
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState(0);
    const [tamaño, setTamaño] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { mascota_id } = useParams();
    const redirect = useNavigate();

    useEffect(() => {
        const getMascota = async () => {
            try {
                console.log(mascota_id)
                const response = await axios.get(`${url}/pet/${mascota_id}`);
                const mascotaData = response.data;
                setNombre(mascotaData.nombre);
                setEspecie(mascotaData.especie);
                setRaza(mascotaData.raza);
                setEdad(mascotaData.edad);
                setTamaño(mascotaData.tamano);
                setDescripcion(mascotaData.descr);
            } catch (error) {
                console.error("Error fetching mascota:", error);
            }
        }
        getMascota();
    }, [mascota_id]);

    const updateMascota = async (e) => {
        e.preventDefault();
        const updatedMascota = {
            nombre: nombre,
            especie: especie,
            raza: raza,
            edad: edad,
            tamano: tamaño,
            descr: descripcion
        };
        try {
            await axios.post(`${url}/pet/update/${mascota_id}`, updatedMascota);
            redirect('/');
        } catch (error) {
            console.error("Error updating mascota:", error);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="card">
                        <div className="card-header bg-dark text-white">Editar mascota</div>
                        <div className="card-body">
                            <form onSubmit={updateMascota}>
                                <label>Nombre: </label>
                                <input type='text' id='nombre' maxLength='30'
                                    className="form-control"
                                    required={true} value={nombre} onChange={(e) => setNombre(e.target.value)}>
                                </input>
                                <label>Especie: </label>
                                <input type='text' id='especie' maxLength='50'
                                    className="form-control"
                                    required={true} value={especie} onChange={(e) => setEspecie(e.target.value)}>
                                </input>
                                <label>Raza: </label>
                                <input type='text' id='raza' maxLength='30'
                                    className="form-control"
                                    required={true} value={raza} onChange={(e) => setRaza(e.target.value)}>
                                </input>
                                <label>Edad: </label>
                                <input type='number' id='edad'
                                    className="form-control"
                                    required={true} value={edad} onChange={(e) => setEdad(e.target.value)}>
                                </input>
                                <label>Tamaño: </label>
                                <input type='text' id='tamaño' maxLength='10'
                                    className="form-control"
                                    required={true} value={tamaño} onChange={(e) => setTamaño(e.target.value)}>
                                </input>
                                <label>Descripción: </label>
                                <input type='text' id='descripcion' maxLength='80'
                                    className="form-control"
                                    required={true} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}>
                                </input>
                                <button className="btn btn-success mt-3">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditMascotas;
