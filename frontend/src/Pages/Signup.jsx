import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Box,
  Button,
  VStack,
  Text,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Reset error messages when input values change
    setNameError('');
    setPhoneNumberError('');
    setEmailError('');
    setPasswordError('');
  }, [name, phoneNumber, email, password]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate input fields
    let isValid = true;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    }

    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError('Phone number should be 10 digits');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError('Password must contain at least one capital letter');
        isValid = false;
      }
      if (!/(?=.*\d)/.test(password)) {
        setPasswordError('Password must contain at least one number');
        isValid = false;
      }
      if (!/(?=.*\W)/.test(password)) {
        setPasswordError('Password must contain at least one special character');
        isValid = false;
      }
      if (password.length < 8) {
        setPasswordError('Password length should not be less than 8');
        isValid = false;
      }
    }

    if (isValid) {
      try {
        // Perform signup logic
        // Make an API call to a server with the signup data
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phoneNumber,
            email,
            password,
          }),
        });

        if (response.ok) {
          // Signup successful
          toast({
            title: 'Signup Successful',
            description: 'You have successfully signed up.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          // Navigate to login page
          navigate('/login');
        } else {
          // Signup failed
          const errorData = await response.json();
          toast({
            title: 'Signup Failed',
            description: errorData.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        // Error occurred during signup
        toast({
          title: 'Signup Error',
          description: 'An error occurred during signup. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleGoogleAuth = () => {
    // Handle Google OAuth here
    toast({
      title: 'Google OAuth',
      description: 'Google authentication functionality goes here.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleFacebookAuth = () => {
    // Handle Facebook OAuth here
    toast({
      title: 'Facebook OAuth',
      description: 'Facebook authentication functionality goes here.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box py={8}>
      <VStack spacing={4} maxW="400px" mx="auto" py={4}>
        <Text fontSize='2xl' as='b'>SignUp</Text>
        <form onSubmit={handleSignup} style={{ width: "90%" }}>

          <FormControl isRequired marginBottom="15px">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {nameError && <Text color="red">{nameError}</Text>}
          </FormControl>

          <FormControl isRequired marginBottom="15px">
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+91" />
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                minLength={10}
                maxLength={10}
              />
            </InputGroup>
            {phoneNumberError && <Text color="red">{phoneNumberError}</Text>}
          </FormControl>


          <FormControl isRequired marginBottom="15px">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <Text color="red">{emailError}</Text>}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <Text color="red">{passwordError}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4} width="100%">
            Sign Up
          </Button>
        </form>

        <Box position="relative" padding="5" width="100%">
          <Divider />
          <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" bg="white" px="4">
            or signup with
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between" width="90%">
          <Button leftIcon={<FaGoogle />} colorScheme="red" onClick={handleGoogleAuth} width="48%">
            Google
          </Button>

          <Button leftIcon={<FaFacebook />} colorScheme="facebook" onClick={handleFacebookAuth} width="48%">
            Facebook
          </Button>
        </Box>

      </VStack>
    </Box>
  );
};

export default Signup;
