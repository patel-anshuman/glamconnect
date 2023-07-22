import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppointmentDetails from '../Components/AppointmentDetails';
import axios from "axios"
const Appointment = ({baseServerURL}) => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  // Replace this mock fetch with an actual API call to get the appointment data
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`http://localhost:8080/appointment/${id}`);
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchAppointment();
  }, []);

  const handleAccept = () => {
    axios.put()
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
