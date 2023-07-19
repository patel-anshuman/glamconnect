import React, { useState } from 'react';
import { Box, Grid, Image, Text, Button, Skeleton ,Center} from '@chakra-ui/react';

// Sample data for categories (replace with your own data)
const categories = [
  {
    id: 1,
    name: 'Hair and Styling',
    imageSrc: '../images/female-hairdresser-making-hairstyle-redhead-woman-beauty-salon.jpg',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    name: 'Makeup Artists',
    imageSrc: '../images/girl-friends-celebration-moments.jpg',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    name: 'Estheticians and Skincare Specialists',
    imageSrc: '../images/woman-getting-treatment-hairdresser-shop.jpg',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const BeautyCategoriesPage = () => {
    // State to track image loading
    const [imageLoaded, setImageLoaded] = useState(false);
  
    // Function to handle image load
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
  
    // Function to handle the button click and navigate to the beauty professionals page
    const handleBrowseClick = (categoryId) => {
      // Replace with your own navigation logic
      console.log('Navigating to beauty professionals for category:', categoryId);
    };
  
    return (
      <Box p={4}>
        <Center fontSize="3xl" p="2" fontWeight="700"  mb="1">Services</Center>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {categories.map((category) => (
            <Box key={category.id} borderWidth="1px" borderRadius="10px" p={4}>
              {!imageLoaded && <Skeleton height="260px" />}
              <Image
                src={category.imageSrc}
                borderRadius={"10px"}
                alt={category.name}
                onLoad={handleImageLoad}
                display={imageLoaded ? 'block' : 'none'}
                // height="200px"
                aspectRatio="4/3"
                objectFit="cover"
              />
              <Text mt={2} fontWeight="bold" fontSize="lg">
                {category.name}
              </Text>   
              <Text mt={2}>{category.info}</Text>
              <Button mt={4} onClick={() => handleBrowseClick(category.id)} colorScheme="purple" size="sm">
                Browse Professionals
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>
    );
  };
  
  export default BeautyCategoriesPage;