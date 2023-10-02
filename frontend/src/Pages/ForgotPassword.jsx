import { useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Context, { myContext } from "../contextAPI/Context";
import { Link } from "react-router-dom"
import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Button,
    VStack,
    Text,
    Divider,
} from '@chakra-ui/react';
const ForgotPassword = ({ baseServerURL }) => {
    const toast = useToast();
    const [email, setEmail] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        fetch(`${baseServerURL}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');

                }
                return response.json();

            })
            .then(data => {
                toast({
                    title: 'Email Sent',
                    description: 'Please check your inbox/spam for the reset email.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                console.log('Success:', data);
            })
            .catch(error => {
                toast({
                    title: 'Something Went Wrong',
                    description: 'Please enter a valid email',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                console.error('Error:', error);
            });


    };


    return (
        <Box py={8}>
            <VStack spacing={4} maxW="400px" mx="auto" py={4}>
                <Text fontSize="2xl" as="b">
                    Forgot Pasword
                </Text>
                <form onSubmit={handleLogin} style={{ width: "90%" }}>
                    <FormControl isRequired marginBottom="15px">
                        <FormLabel>Type Your Registered Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" mt={4} width="100%">
                        Reset-Password
                    </Button>
                </form>
                <Divider />
            </VStack>
        </Box>
    );
};

export default ForgotPassword;
