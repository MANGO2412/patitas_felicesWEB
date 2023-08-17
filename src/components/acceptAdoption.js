import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AdminView = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener información del usuario y solicitudes de adopción desde las API
      const userResponse = await axios.get('https://terra-ogo9.onrender.com/user/' + user[0].id);
      const adoptionResponse = await axios.get('https://terra-ogo9.onrender.com/adopcion/');

      // Procesar datos de usuario y adopción
      const userData = userResponse.data;
      const adoptionData = adoptionResponse.data;

      // Combinar solicitudes de adopción con datos de usuario
      const requestsWithUserData = adoptionData.map((request) => {
        const user = userData.find((u) => u.id === request.userId);
        return { ...request, userName: user ? user.name : 'Desconocido' };
      });

      setAdoptionRequests(requestsWithUserData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const acceptAdoption = (requestId) => {
    setSelectedRequest(requestId);

    // Realizar lógica de aceptación, por ejemplo, actualizar el estado en la API o la base de datos
    // Puedes usar el requestId para identificar la solicitud de adopción específica
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Administración de Adopciones</Text>

      {adoptionRequests.length > 0 ? (
        adoptionRequests.map((request) => (
          <View key={request.id} style={styles.requestContainer}>
            <Text style={styles.requestText}>Usuario: {request.userName}</Text>
            <Text style={styles.requestText}>Mascota: {request.petName}</Text>
            {/* Otros detalles de la mascota */}
            <Button
              title="Aceptar Adopción"
              onPress={() => acceptAdoption(request.id)}
              disabled={selectedRequest === request.id}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noRequestText}>No hay solicitudes pendientes</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
  },
  requestText: {
    fontSize: 18,
    marginBottom: 10,
  },
  noRequestText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default AdminView;
