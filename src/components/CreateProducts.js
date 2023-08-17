import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = 'https://terra-ogo9.onrender.com';

const CreateMascotas = () => {
    const [nombre, setNombre] = useState('');
    const [especie, setEspecie] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState(0);
    const [tamaño, setTamaño] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const redirect = useNavigate();

    const storeMascota = async (e) => {
        e.preventDefault();
        const newMascota = {
            nombre: nombre,
            especie: especie,
            raza: raza,
            edad: Number(edad),
            tamano: Number(tamaño),
            descr: descripcion,
            employe:"2342354fetggty54"
        };
        try {
            console.log(newMascota);
            await axios.post(url+'/pet/new', newMascota);
            redirect('/');
        } catch (error) {
            console.error("Error creating mascota:", error.message);
        }
    }
  
    
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                    <div className="card">
                        <div className="card-header bg-dark text-white">Añadir mascota</div>
                        <div className="card-body">
                            <form onSubmit={storeMascota}>
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

export default CreateMascotas;
