import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import ProfessionalCard from '../Components/ProfessionalCard';

// Sample data for professionals (replace with your own data)
const professionals = [
    {
      name: 'John Doe',
      imageSrc: 'john-doe-image.jpg',
      description: 'Experienced hairstylist specializing in trendy cuts and styles.',
      skillset: ['Haircut', 'Hairstyling', 'Coloring'],
      moreInfo: 'Over 10 years of experience in the industry.',
      services: [
        {
          name: 'Haircut',
          amount: '$30',
          duration: '45 minutes',
        },
        {
          name: 'Hairstyling',
          amount: '$40',
          duration: '1 hour',
        },
        {
          name: 'Coloring',
          amount: '$60',
          duration: '2 hours',
        },
      ],
    },
    {
      name: 'Jane Smith',
      imageSrc: 'jane-smith-image.jpg',
      description: 'Skincare specialist offering personalized facial treatments.',
      skillset: ['Facials', 'Chemical Peels', 'Microdermabrasion'],
      moreInfo: 'Certified aesthetician with a focus on natural skincare products.',
      services: [
        {
          name: 'Facial',
          amount: '$50',
          duration: '1 hour',
        },
        {
          name: 'Chemical Peel',
          amount: '$80',
          duration: '1.5 hours',
        },
        {
          name: 'Microdermabrasion',
          amount: '$70',
          duration: '1 hour',
        },
      ],
    },
    // Add more professionals here
  ];
const ProfessionalsPage = ({baseServerURL}) => {
  const handleBooking = (professionalId) => {
    // Replace with your booking logic
    console.log('Booking professional with ID:', professionalId);
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {professionals.map((professional) => (
          <ProfessionalCard
            key={professional.id}
            professional={professional}
            onBook={() => handleBooking(professional.id)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProfessionalsPage;
