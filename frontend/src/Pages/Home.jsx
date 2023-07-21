import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Heading, Text, Flex, Container, Avatar } from '@chakra-ui/react';
import { FaSearch, FaRegListAlt, FaCheckCircle } from 'react-icons/fa';

const Home = () => {

  useEffect(() => {
    document.title = 'GlamConnect';
  }, []);
  
  return (
    <Box>
      {/* Carousel Section */}
      <Box height="60vh" position="relative">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          <div>
            <img
              src="https://images.unsplash.com/photo-1595475884562-073c30d45670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              alt="Slide 1"
              style={{
                height: '60vh', objectFit: 'cover', backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(50%)'
              }}
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Slide 2"
              style={{
                height: '60vh', objectFit: 'cover', backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(80%)'
              }}
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
              alt="Slide 2"
              style={{
                height: '60vh', objectFit: 'cover', backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(70%)'
              }}
            />
          </div>
        </Carousel>
        <div className="carousel-caption">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
          >
            <Heading as="h1" size="4xl" color="white" marginBottom="20px" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',  }}>
              GlamConnect
            </Heading>
            <Text color="white" fontSize="2xl" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              Book Your Appointment Today!
            </Text>
          </Box>
        </div>
      </Box>

      {/* About Us Section */}
      <Box bg="gray.100" py="8">
        <Container maxW="container.md">
          <Heading as="h2" size="xl" mb="4">
            How It Works
          </Heading>
          <Flex flexWrap="wrap">
            <Box flex="1" bg="white" p="4" shadow="md" borderRadius="md" mr="4" mb="4">
              <FaSearch size={32} color="blue.500" />
              <Heading as="h3" size="lg" my="2">
                Search
              </Heading>
              <Text>
                Search for the perfect salon based on your location, services
                you're looking for, and your budget.
              </Text>
            </Box>

            <Box flex="1" bg="white" p="4" shadow="md" borderRadius="md" mr="4" mb="4">
              <FaRegListAlt size={32} color="green.500" />
              <Heading as="h3" size="lg" my="2">
                Shortlist
              </Heading>
              <Text>
                Shortlist salons you like based on their services, reviews, and
                photos to keep track of your favorites.
              </Text>
            </Box>

            <Box flex="1" bg="white" p="4" shadow="md" borderRadius="md" mr="4" mb="4">
              <FaCheckCircle size={32} color="purple.500" />
              <Heading as="h3" size="lg" my="2">
                Book
              </Heading>
              <Text>
                Book your preferred salon by selecting the services you need or
                contacting them directly to schedule an appointment.
              </Text>
            </Box>
          </Flex>
          <Text mt="4" fontSize="sm" color="gray.600">
            We have listings of salons from all over India offering various
            services, including haircuts, styling, manicures, pedicures, facials,
            and more.
          </Text>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py="8">
        <Container maxW="container.md">
          <Heading as="h3" size="xl" mb="4">
            What people are saying…
          </Heading>

          {/* Testimonial 1 */}
          <Flex align="center" mb="4">
            <Avatar
              size="lg"
              src="https://images.unsplash.com/photo-1638493489135-34bf34dd320b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
              alt="John Doe"
            />
            <Box ml="3">
              <Text fontSize="lg" fontWeight="bold">
                Riya Verma
              </Text>
              <Text>
                Absolutely fantastic experience! The salon's expert stylists transformed my look and left me feeling confident and beautiful.
              </Text>
            </Box>
          </Flex>

          {/* Testimonial 2 */}
          <Flex align="center" mb="4">
            <Avatar
              size="lg"
              src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
              alt="Jane Smith"
            />
            <Box ml="3">
              <Text fontSize="lg" fontWeight="bold">
                Vikram Kumar
              </Text>
              <Text>
                My go-to platform for salon bookings. The variety of services and seamless process keeps me coming back for more.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Box py="8">
        <Container maxW="container.md">
          <Heading as="h2" size="xl" mb="4">
            Gallery
          </Heading>
          <Flex justify="space-between">
            <Box w="30%" h="200px" overflow="hidden">
              <img
                src="https://images.unsplash.com/photo-1522337094846-8a818192de1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=394&q=80"
                alt="Gallery 1"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
            <Box w="30%" h="200px" overflow="hidden">
              <img
                src="https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Gallery 2"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
            <Box w="30%" h="200px" overflow="hidden">
              <img
                src="https://images.unsplash.com/photo-1610545936431-9983d41e52b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Gallery 3"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
