import React from 'react';
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
  useToast
} from '@chakra-ui/react';

const ProfessionalCard = ({ professional, onBook }) => {
  const { name, imageSrc, description, skillset, moreInfo, services } = professional;
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    service: '',
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

  const handleSelectService = (selectedService) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      service: selectedService.name,
    }));
  };

  const getServiceDetails = () => {
    const selectedService = services.find((service) => service.name === formData.service);
    if (selectedService) {
      return (
<Flex mt={4} p={4} borderWidth="1px" borderRadius="md" colorScheme="purple">
  <Text fontWeight="bold">Price:</Text>
  <Text>{selectedService.amount}</Text>
  <Text fontWeight="bold">Duration:</Text>
  <Text>{selectedService.duration}</Text>
  {selectedService.moreInfo && (
    <Text>{selectedService.moreInfo}</Text>
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
        <Image src="../images/female-hairdresser-making-hairstyle-redhead-woman-beauty-salon.jpg" borderRadius="10px" alt={name} objectFit="cover"/>
      </Box>
      <Text mt={2} fontWeight="bold" fontSize="lg">
        {name}
      </Text>
      <Text mt={2} fontSize="sm">
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
      <Button mt={4} onClick={handleOpenModal} colorScheme="purple" size="sm">
        Book Appointment
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Appointment</ModalHeader>
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
                <Select name="service" value={formData.service} onChange={handleInputChange}>
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name} onClick={() => handleSelectService(service)}>
                      {service.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {getServiceDetails()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleBookAppointment}>
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
