import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import ProfessionalCard from '../Components/ProfessionalCard';
import { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
const ProfessionalsPage = ({baseServerURL}) => {
  const [professionals, setProfessional] = useState([])
  const {id} =  useParams();
  useEffect(()=>{
    const fetchProfessional=async()=>{
      const response = await fetch(`${baseServerURL}/professionals/${id}`);
      const data = await response.json();
      console.log(data);
      setProfessional(data)
    }
    fetchProfessional();
  },[])
  const handleBooking = (professionalId) => {
    // Replace with your booking logic
    console.log('Booking professional with ID:', professionalId);
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} placeItems={"center"}>
        {professionals.map((professional) => (
          <ProfessionalCard
            Deplyurl={baseServerURL}
            key={professional._id}
            professional={professional}
            onBook={() => handleBooking(professional._id)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProfessionalsPage;
