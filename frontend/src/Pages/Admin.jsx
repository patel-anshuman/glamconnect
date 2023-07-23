import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Grid,
    GridItem,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { Image, Tag, TagLabel, TagLeftIcon, Flex, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaSpa } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Admin = ({ baseServerURL }) => {
    {/*try to add skeleton if data is not fetched yet*/ }
    const [users, setUsers] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [activeTab, setActiveTab] = useState('users');

    const toast = useToast();

    const fetchUsers = async () => {
        try {
            const token = Cookies.get('token');

            const response = await fetch(`${baseServerURL}/admin/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUsers(userData);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProfessionals = async () => {
        try {
            const token = Cookies.get('token');

            const response = await fetch(`${baseServerURL}/admin/professional`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const professionalData = await response.json();
                setProfessionals(professionalData);
            } else {
                console.error('Error fetching professionals:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching professionals:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProfessionals();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleModifyUser = (userId) => {
        // Handle modify user action here
        console.log('Modify User:', userId);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const token = Cookies.get("token"); // Get the authentication token from cookies

            if (!token) {
                console.error("Authentication token not found.");
                return;
            }

            // Make a DELETE request to the backend route /admin/user/${userId} with the bearer token in the headers
            const response = await fetch(`${baseServerURL}/admin/user/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // If the delete request is successful, show a success toast
                toast({
                    title: "User Deleted",
                    description: "The user has been successfully deleted.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                fetchUsers();
                // Fetch the updated list of users here and update the state accordingly
            } else {
                // If the delete request fails, show an error toast
                toast({
                    title: "Delete Failed",
                    description: "An error occurred while deleting the user.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error during user deletion:", error);
        }
    };

    const handleModifyProfessional = (professionalId) => {
        // Handle modify professional action here
        console.log('Modify Professional:', professionalId);
    };

    const handleDeleteProfessional = async (professionalId) => {
        try {
            const token = Cookies.get("token"); // Get the authentication token from cookies

            if (!token) {
                console.error("Authentication token not found.");
                return;
            }

            // Make a DELETE request to the backend route /admin/user/${userId} with the bearer token in the headers
            const response = await fetch(`${baseServerURL}/admin/user/${professionalId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // If the delete request is successful, show a success toast
                toast({
                    title: "Professional Deleted",
                    description: "The professional has been successfully deleted.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                fetchProfessionals();
                // Fetch the updated list of users here and update the state accordingly
            } else {
                // If the delete request fails, show an error toast
                toast({
                    title: "Delete Failed",
                    description: "An error occurred while deleting the professional.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error during professional deletion:", error);
        }
    };

    return (
        <Container mt={8} maxW="container.xl">
            <Tabs isFitted variant='soft-rounded' colorScheme='purple'>
                <TabList mb="1em">
                    <Tab
                        onClick={() => handleTabChange('users')}
                        isActive={activeTab === 'users'}
                    >
                        Users
                    </Tab>
                    <Tab
                        onClick={() => handleTabChange('professionals')}
                        isActive={activeTab === 'professionals'}
                    >
                        Professionals
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                            {users.map((user) => (
                                <Box key={user._id} borderWidth="1px" p={4} borderRadius="md" boxShadow="md">
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        {user.name}
                                    </Text>
                                    <Text fontSize="sm" mb={2}>
                                        {user.email}
                                    </Text>
                                    <Text fontSize="sm" mb={4}>
                                        {user.phoneNumber}
                                    </Text>
                                    <IconButton
                                        icon={<FaEdit />}
                                        colorScheme="teal"
                                        size="sm"
                                        mr={2}
                                        onClick={() => handleModifyUser(user.id)}
                                    />
                                    <IconButton
                                        icon={<FaTrash />}
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleDeleteUser(user._id)}
                                    />
                                </Box>
                            ))}

                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            {professionals.map((professional) => (
                                <GridItem key={professional._id}>
                                    <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="md">
                                        {/* {<Image src={professional.imageSrc} alt={professional.name} mb={4} />} */}
                                        <Text fontSize="xl" fontWeight="bold" mb={2}>
                                            {professional.name}
                                        </Text>
                                        <Text fontSize="sm" mb={2}>
                                            Email: {professional.email}
                                        </Text>
                                        <Text fontSize="sm" mb={4}>
                                            Description: {professional.description}
                                        </Text>
                                        <Flex flexWrap="wrap" mb={4}>
                                            {professional.skillset.map((skill) => (
                                                <Tag key={skill} mr={2} mb={2} variant="subtle" colorScheme="teal">
                                                    <TagLeftIcon as={FaSpa} />
                                                    <TagLabel>{skill}</TagLabel>
                                                </Tag>
                                            ))}
                                        </Flex>
                                        <IconButton
                                            icon={<FaEdit />}
                                            colorScheme="teal"
                                            size="sm"
                                            mr={2}
                                            onClick={() => handleModifyProfessional(professional._id)}
                                        />
                                        <IconButton
                                            icon={<FaTrash />}
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => handleDeleteProfessional(professional._id)}
                                        />
                                    </Box>
                                </GridItem>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Admin;
