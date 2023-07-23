import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentDetails from '../Components/AppointmentDetails';
import axios from "axios"
import { useToast } from '@chakra-ui/react';

const Appointment = ({baseServerURL}) => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const toast = useToast();
  // Replace this mock fetch with an actual API call to get the appointment data
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`${baseServerURL}/appointment/${id}`);
        const data = await response.json();
        setAppointment(data);
         console.log(data) 
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchAppointment();
  }, []);

  const handleAccept = () => {
    fetch(`${baseServerURL}/appointment/${id}`,{
      method: 'PUT',
      headers: {
        
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status:"accepted"})
    }).then(response => {
      return response.json();
    })
    .then(data => {
      console.log('Appointment successfully created:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    // console.log(JSON.stringify(formData))
  
    toast({
      title: `Appointment Accepted!`,
      status: 'success',
      isClosable: true,
    });
  };

  const handleReject = () => {
    // Handle the reject logic and API call here
    console.log('Rejected appointment:', appointment._id);
  };

  return (
    <div style={{
        height:"100vh"
    }}>
      {appointment ? (
        <AppointmentDetails
          appointment={appointment}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Appointment;
