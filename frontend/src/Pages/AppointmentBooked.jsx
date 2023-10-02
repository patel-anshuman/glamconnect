import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  IconButton,
  Stack,
  Avatar,
  Spacer,
  Badge,
  Tooltip,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import {
  FaDollarSign,
  FaCreditCard,
  FaCheckCircle,
  FaUserTie,
  FaClock,
  FaEnvelope,
} from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const AppointmentBooked = ({ baseServerURL }) => {
  const [appointments, setAppointments] = useState([]);
  const token = Cookies.get('token');
  useEffect(() => {
    // console.log(baseServerURL)
    const fetchData = () => {
      axios.get(`${baseServerURL}/api/appointment/booked`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `booked ${token}`,
        },
      })
        .then((response) => {
          const data = response.data;
          console.log(data);
          setAppointments(data.appoint);
        })
        .catch((error) => {
          console.error('Axios Error:', error);
        });
    };

    fetchData();
  }, []);
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_YKejJgzYAHnIpL",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${baseServerURL}/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (price, id) => {
    try {
      const orderUrl = `${baseServerURL}/orders`;
      const { data } = await axios.post(orderUrl, { amount: price, appointmentID: id });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentTwo = (appointmentId, paymentMethod) => {
    // Implement your payment logic here based on the payment method
    console.log(
      `Payment for appointment ${appointmentId} processed using ${paymentMethod}.`
    );
  };

  const isUpcomingAppointment = (appointment) => {
    const appointmentDate = new Date(appointment.date);
    const currentDate = new Date();
    return appointmentDate >= currentDate;
  };

  return (
    <Box p="4">
      <Heading mb="4" size="xl" color="purple.500">
        Your Appointments
      </Heading>
      {appointments.length === 0 ? (
        <Text fontSize="lg">
          No Appointments available.{' '}
          <Link to="/categories" color="purple.500" className='bg-purple-600 p-2 rounded-lg text-slate-100 font-bold hover:bg-purple-800'>
            Go to services
          </Link>{' '}
          to book a new appointment.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {appointments.map((appointment) => (
            <GridItem key={appointment._id}>
              <Box
                bg="white"
                p="4"
                borderRadius="lg"
                //   boxShadow="md"
                h="100%" borderWidth={"1px"}
              >
                <Flex align="center" justify="space-between" mb="2">
                  <Flex align="center">
                    <Avatar src="https://example.com/ella.jpg" size="lg" mr="4" />
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" color="purple.500">
                        {appointment.professional.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {appointment.service.name}
                      </Text>
                    </Box>
                  </Flex>
                  <Badge
                    colorScheme={isUpcomingAppointment(appointment) ? 'purple' : 'green'}
                  >
                    {isUpcomingAppointment(appointment) ? 'Upcoming' : 'Completed'}
                  </Badge>
                </Flex>
                <Flex align="center" color="gray.600" fontSize="sm">
                  <FaClock />
                  <Text ml="2">
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    , {appointment.time}
                  </Text>
                </Flex>
                <Flex align="center" color="gray.600" fontSize="sm" mt="2">
                  <FaEnvelope />
                  <Text ml="2">{appointment.professional.email}</Text>
                </Flex>
                <Flex align="center" color="gray.600" fontSize="sm" mt="2">
                  <FaUserTie />
                  <Text ml="2">{appointment.professional.description}</Text>
                </Flex>
                {isUpcomingAppointment(appointment) && !appointment.service.paid && (
                  <Flex mt="4" alignItems="center">
                    <Text fontWeight="bold" fontSize="md">
                      Amount: ₹{appointment.service.amount_numeric}
                    </Text>
                    <Stack direction="row" ml="4">
                      <Tooltip label="Pay Online">
                        <IconButton
                          aria-label="Pay Online"
                          icon={<FaCreditCard size={18} />}
                          colorScheme="purple"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePayment(appointment.service.amount_numeric, appointment._id)

                          }
                        />
                      </Tooltip>
                      <Tooltip label="Pay with Cash">
                        <IconButton
                          aria-label="Pay with Cash"
                          icon={<FaDollarSign size={18} />}
                          colorScheme="purple"
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaymentTwo(appointment._id, appointment.service.amount_numeric, 'cash')}
                        />
                      </Tooltip>
                    </Stack>
                  </Flex>
                )}
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>)}
    </Box>
  );
};

export default AppointmentBooked;
