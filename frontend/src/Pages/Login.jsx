import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  VStack,
  Text,
  Divider,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input fields
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      try {
        // Perform login logic here
        // You can make an API call to a server or handle the login process as per your requirements
        // After successful login, you can navigate to another page

        // Replace the following code with your login logic
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          // Login successful
          toast({
            title: 'Login Successful',
            description: 'You have successfully logged in.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          // Navigate to home page
          navigate('/');
        } else {
          // Login failed
          throw new Error('Invalid email or password. Please try again.');
        }
      } catch (error) {
        // Error occurred during login
        toast({
          title: 'Login Failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };


  return (
    <Box py={8}>
      <VStack spacing={4} maxW="400px" mx="auto" py={4}>
        <Text fontSize="2xl" as="b">
          Login
        </Text>
        <form onSubmit={handleLogin} style={{ width: "90%" }}>
          <FormControl isRequired marginBottom="15px">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <Text color="red">{emailError}</Text>}
          </FormControl>

          <FormControl isRequired marginBottom="10px">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <Text color="red">{passwordError}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4} width="100%">
            Login
          </Button>
        </form>

        <Divider />

        <Text>
          Don't have an account?{' '}
          <Link color="blue.500" href="/signup">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
