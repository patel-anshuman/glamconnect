import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
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

const ResetPassword = ({ baseServerURL }) => {
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();
    // console.log(data)    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        fetch(`${baseServerURL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                resetToken: token,
                newPassword: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                toast({
                    title: 'Password Reset Successful',
                    description: 'Your password has been reset.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((error) => {
                toast({
                    title: 'Something Went Wrong',
                    description: 'Unable to reset your password. Please try again.',
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
                    Reset Password
                </Text>
                <form onSubmit={handleResetPassword} style={{ width: '90%' }}>
                    <FormControl isRequired marginBottom="15px">
                        <FormLabel>New Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired marginBottom="15px">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" mt={4} width="100%">
                        Reset Password
                    </Button>
                </form>
                <Divider />
            </VStack>
        </Box>
    );
};

export default ResetPassword;
