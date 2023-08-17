import axios from 'axios';
import { Filler } from 'chart.js';
import React, { useState, useEffect } from 'react';

const AdminView = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
//   const [currentRequestIndex, setCurrentRequestIndex] = useState(2);

const fetchData = async () => {
    try {
      const response = await fetch('https://terra-ogo9.onrender.com/adopcion');
      const data = await response.json();
      setAdoptionRequests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  
  const acceptAdoption =async  (element) => {
    const json={
        usuario:element.informacionUsuario['_id'],
        mascota:element.informacionMascota['_id'],
        status:true
    }

    
    try {
        const response = await axios.post('https://terra-ogo9.onrender.com/adopcion/update/'+element['_id'],json);
        console.log(response.data)    
    } catch (error) {
        console.log(error.message)
    }

    await fetchData()

    console.log(json)
  };

  const rejectAdoption = async (id) => {
    try {
        const response = await axios.post('https://terra-ogo9.onrender.com/adopcion/delete/'+id);
        console.log(response.data)    
    } catch (error) {
        console.log(error.message)
    }

    await fetchData()
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Administración de Adopciones</h1>
      
      {adoptionRequests.length > 0 ? (
        <>
           {adoptionRequests.filter(adop=>!adop.status).map((adopcion)=> (
                       <div style={styles.requestContainer}>
                           <p style={styles.requestText}>
                             Usuario: {adopcion.informacionUsuario.nombre}
                           </p>
                           <p style={styles.requestText}>
                             Mascota: {adopcion.informacionMascota.nombre}
                           </p>
                           {/* Otros detalles de la mascota */}
                           <div style={styles.buttonContainer}>
                             <button
                               style={styles.acceptButton}
                               onClick={()=>{acceptAdoption(adopcion)}}
                             >
                               Aceptar Adopción
                             </button>
                             <button
                               style={styles.rejectButton}
                               onClick={()=>{rejectAdoption(adopcion['_id'])}}
                             >
                               Rechazar Adopción
                             </button>
                           </div>
                       </div>
                    )
                
          )}
        </>
      ) : (
        <p style={styles.noRequestText}>No hay solicitudes pendientes</p>
      )}
      

      
    </div>
  )
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    border: '1px solid #ccc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: 400,
  },
  requestText: {
    fontSize: 18,
    marginBottom: 10,
  },
  noRequestText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  acceptButton: {
    backgroundColor: '#82CD47',
    color: 'white',
    padding: '10px 20px',
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#FE0000',
    color: 'white',
    padding: '10px 20px',
    fontSize: 16,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default AdminView;
