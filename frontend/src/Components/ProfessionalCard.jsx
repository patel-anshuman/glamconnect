import React,{useState}from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Grid,
  GridItem,
  useToast,
  Divider
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Icon } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";


const ProfessionalCard = ({ professional, onBook }) => {
  const { name, imageSrc, description, skillset, moreInfo, services,_id } = professional;
  const {id} = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [currentProfessional, setCurrentProfessional] = useState("");
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    service: '',
    professional:_id
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectService = (event) => {
    const selectedServiceId = event.target.value;
    const selectedService = services.find((service) => service._id === selectedServiceId);

    setFormData((prevFormData) => ({
      ...prevFormData,
      service: selectedServiceId, // Store the selected service's ID in formData
    }));
    setSelectedService(selectedService); // Update the selectedService state
  };
  const getServiceDetails = () => {
    const selectedService = services.find((service) => service._id === formData.service);
    if (selectedService) {
      return (
        <Flex
        mt={4}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        // boxShadow="md"
        flexDirection="column"
        alignItems="center"
      >
        <Grid templateColumns="1fr 1fr" gap={4} mb={4} alignItems="center">
          <GridItem>
            <Text fontWeight="bold" fontSize="lg" color="purple.500">
              Price:
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {selectedService.amount}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" fontSize="lg" color="purple.500">
              Duration:
            </Text>
            <Flex alignItems="center">
              <Box as={FiClock} mr={2} />
              <Text fontSize="lg">{selectedService.duration}</Text>
            </Flex>
          </GridItem>
        </Grid>
        {selectedService.moreInfo && (
          <Flex alignItems="center">
            <Box as={FiInfo} color="purple.500" mr={2} />
            <Text fontSize="lg">{selectedService.moreInfo}</Text>
          </Flex>
        )}
      </Flex>
      );
    }
    return null;
  };
  const handleBookAppointment = () => {
    // Add your booking logic here
    console.log('Booking appointment:', formData);
  
    toast({
      title: `Appointment Booked!`,
      status: 'success',
      isClosable: true,
    });
    handleCloseModal();
  };

  return (
    <Box borderWidth="1px" borderRadius="10px" p={4} maxW="sm">
      <Box>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" borderRadius="10px" alt={name} objectFit="cover"/>
      </Box>
      <Text mt={2} fontWeight="bold" fontSize="lg">
        {name}
      </Text>
      <Text mt={2} fontSize="sm" noOfLines={1}>
        {description}
      </Text>
      <Text mt={2} fontWeight="bold" fontSize="md">
        Skillset:
      </Text>
      <Box mt={2}>
        {skillset.map((skill) => (
          <Badge key={skill} colorScheme="purple" mr={2}>
            {skill}
          </Badge>
        ))}
      </Box>
      <Text noOfLines={1} mt={2} fontSize="sm">
        {moreInfo}
      </Text>
      <Button mt={4} onClick={handleOpenModal} colorScheme="purple" size="md">
        Book Appointment
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Appointment of {name}</ModalHeader>
          {/* <Text>Please fill this form</Text> */}
          <Divider/>
          <ModalBody>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gridGap={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <Input type="time" name="time" value={formData.time} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea name="message" value={formData.message} onChange={handleInputChange} />
              </FormControl>
              <FormControl gridColumn="1 / span 2">
                <FormLabel>Service</FormLabel>
                <Select
                  name="service"
                  value={formData.service} // Use the formData's service property directly
                  onChange={handleSelectService}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  ))}
                </Select>

            {getServiceDetails()}
          {/* <Divider/> */}
              </FormControl>
            </Box>
          </ModalBody>
          <Divider/>
          <ModalFooter>
            <Button colorScheme="purple" mr={3}  onClick={handleBookAppointment}>
              Book
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfessionalCard;
