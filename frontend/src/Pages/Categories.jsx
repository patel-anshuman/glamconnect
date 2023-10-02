import React, { useState, useEffect } from 'react';
import { Box, Grid, Image, Text, Button, Skeleton, Center, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BeautyCategoriesPage = ({ baseServerURL }) => {
  // State to track image loading
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [categories, setCategory] = useState([]);
  // Function to handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to handle the button click and navigate to the beauty professionals page
  const handleBrowseClick = (categoryId) => {
    nav(`/categories/professionals/${categoryId}`)
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseServerURL}/categories`);
        const data = await response.json();
        if (data) {
          setIsLoading(false)
        }
        setCategory(data);
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  })
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

      <Center fontSize="3xl" p="2" fontWeight="700" mb="1">Services</Center>
      <Grid templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1,1fr))" }} gap={6}>
        {categories.map((category) => (
          <Box key={category._id} borderWidth="1px" borderRadius="10px" p={4}>
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
            <Text noOfLines={2} mt={2}>{category.description}</Text>
            <Button mt={4} onClick={() => handleBrowseClick(category._id)} colorScheme="purple" size="sm">
              Browse Professionals
            </Button>
          </Box>
        ))}
      </Grid>
    </Box >
  );
};

export default BeautyCategoriesPage;