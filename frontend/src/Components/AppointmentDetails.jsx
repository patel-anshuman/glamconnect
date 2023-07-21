import React from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Divider,
  VStack,
  HStack,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AppointmentDetails = ({ appointment, onAccept, onReject }) => {
  const { name, date, time, service, message, user, professional } = appointment;

  return (
    <Box p={6} width="100%">
      <Heading size="xl" fontFamily="Aeriel, sans-serif" py="3">
        Hello, {professional.name}
      </Heading>
      <Divider />
      <Flex align="center" justify="space-between" p={2}>
        <Text fontSize="26px" fontFamily="Aeriel, sans-serif" color="#121212">
          Appointment Request
        </Text>
        <Text fontSize="20px">
          <strong>Date:</strong> {new Date(date).toDateString().split(" ").join("-")}
        </Text>
      </Flex>
      <Divider />
      <VStack align="start" spacing={4} p={5}>
        <HStack spacing={8}>
          <Image
            src="https://img.freepik.com/free-icon/user_318-159711.jpg" // Replace with the user's profile image or use a default image
            alt={user.name}
            boxSize="140px"
            borderRadius="full"
            boxShadow="lg"
          />
          <VStack align="start" spacing={2}>
            <Text fontSize="20px">
              <strong>User Name:</strong> {user.name}
            </Text>
            <Text fontSize="20px">
              <strong>Service:</strong> {service.name}
            </Text>
            <Text fontSize="20px">
              <strong>Time:</strong> {time}
            </Text>
            <Text fontSize="20px">
              <strong>Message:</strong> {message}
            </Text>
          </VStack>
        </HStack>
        <Divider />
      </VStack>
      <Flex mt={6}>
        <Button
          colorScheme="green"
          flex="1"
          mr={2}
          size="lg"
          onClick={onAccept}
          leftIcon={<Icon as={FaCheck} boxSize={6} />}
        >
          Approve
        </Button>
        <Button
          colorScheme="red"
          flex="1"
          ml={2}
          size="lg"
          onClick={onReject}
          leftIcon={<Icon as={FaTimes} boxSize={6} />}
        >
          Reject
        </Button>
      </Flex>
    </Box>
  );
};

export default AppointmentDetails;
