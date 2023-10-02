import { Box, Grid, Spinner } from '@chakra-ui/react';
import ProfessionalCard from '../Components/ProfessionalCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const ProfessionalsPage = ({ baseServerURL }) => {
  const [professionals, setProfessional] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams();
  useEffect(() => {
    const fetchProfessional = async () => {
      const response = await fetch(`${baseServerURL}/professionals/${id}`);
      const data = await response.json();
      if (data) {
        setIsLoading(false)
      }
      console.log(data);
      setProfessional(data)
    }
    fetchProfessional();
  }, [])
  const handleBooking = (professionalId) => {
    // Replace with your booking logic
    console.log('Booking professional with ID:', professionalId);
  };

  return (
    <Box p={4}>
      {
        isLoading &&
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6} placeItems={"center"}>
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
