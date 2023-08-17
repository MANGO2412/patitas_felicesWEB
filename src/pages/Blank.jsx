import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = 'https://terra-ogo9.onrender.com';


const Blank = () => {
    
    const [pets,setPets]=useState([]);
    
    async function newPets(){
        try {
          let resp=await axios.get(url+'/pet/new');
           console.log(resp.data)
          setPets(resp.data)
        } catch (error) {
          setPets([])          
        }
    }


    async function remove(id){
        try {
            await axios.post(url+'/pet/delete/'+id);
            await getPets();
        } catch (error) {
           await getPets();
        }
    }

    async function getPets(){
        try {
          let resp=await axios.get(url+'/pet/');
           console.log(resp.data)
          setPets(resp.data)
        } catch (error) {
          setPets([])          
        }
    } 

  useEffect(()=>{
      getPets();
  },[])
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
                                 {
                                    pets.map((pet,index)=>(
                                        <tr key={pet.id}>
                                            <td>{index + 1}</td>
                                            <td>{pet.nombre}</td>
                                            <td>{pet.especie}</td>
                                            <td>{pet.raza}</td>
                                            <td>{pet.edad}</td>
                                            <td>{pet.tamano}</td>
                                            <td>{pet.descr}</td>
                                            <td>
                                                <Link
                                                    to={`/edit/${pet.id}`}
                                                    className="btn btn-warning"
                                                >
                                                    Editar
                                                </Link>{" "}
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>{remove(pet.id)}
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                         </tr>
                                    ))
                                 }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Blank
