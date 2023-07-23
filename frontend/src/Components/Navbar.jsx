import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Context, { myContext } from "../contextAPI/Context";

const Navbar = ({ baseServerURL }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { login, userLogin, userLogout } = useContext(myContext);
  const [user, setUser] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  // console.log({login})
  // console.log(useContext(Context))
  // console.log(user)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Check if the token is present in cookies
        const token = Cookies.get("token");
        if (token) {
          const response = await fetch(`${baseServerURL}/user/data`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `logged ${token}`,
            },
          });

          if (response.ok) {
            // Fetch user details from the response
            const userData = await response.json();
            setUser(userData);
          } else {
            // If the response status is not OK, the user token may be invalid or expired
            // You can handle this scenario as per your requirements
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [login]);

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token"); // Get the authentication token from cookies

      if (!token) {
        console.error("Authentication token not found.");
        return;
      }

      // Make an API call to the backend route /user/logout with the bearer token in the headers
      const response = await fetch(`${baseServerURL}/user/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // If the logout request is successful, show a success toast
        // console.log("Logout button clicked")
        toast({
          title: "Logout Successful",
          description: "You have been logged out.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        Cookies.remove("token");    // Clear the authentication token from cookies
        userLogout();   // Reset the user state to null
        // setUser(null); 
        navigate("/");    // Refresh home page
      } else {
        // If the logout request fails, show an error toast
        toast({
          title: "Logout Failed",
          description: "An error occurred while logging out.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="purple.600"
    //   color="white"
    >
      {/* Logo */}
      <Link to="/">
        <Text as="a" fontWeight="bold" fontSize="2xl" color="white">
          GlamConnect
        </Text>
      </Link>
      {/* Hamburger Menu */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onToggle}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        variant="ghost"
        aria-label="Toggle menu"
        bg="white"
        borderRadius="md"
        p={1}
        _hover={{ bg: "gray.200" }}
      />

      {/* Menu Items */}
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          pt={{ base: 4, md: 0 }}
          color="white"
          fontWeight="500"
          gap="45px"
          fontSize={"18px"}
        >
          <Link
            as="a"
            // href="#"
            px={2}
            to="/"
            py={1}
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </Link>
          <Link
            as="a"
            href="#"
            px={2}
            py={1}
            to="/categories"
            _hover={{ textDecoration: "underline" }}
          >
            Services
          </Link>
          <Link
            as="a"
            href="#"
            px={2}
            py={1}
            _hover={{ textDecoration: "underline" }}
          >
            About
          </Link>
        </Flex>
      </Box>

      {/* User Dropdown */}
      {login ? (
        // If the user is logged in
        <Box display="flex" alignItems="center" border="md" gap="5px" color="grey.600">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="white">
              {user.name}
            </MenuButton>
            <MenuList>
              {/* Common menu items for both user and admin */}
              <MenuItem fontWeight="500" borderWidth="1px" display={"flex"} borderTop="none" borderLeft="none" borderRight="none" gap={"10px"}>
                <MdAccountCircle fontSize={"23px"} />
                My Account
              </MenuItem>

              {/* Role-specific menu items */}
              {user.role === "user" && (
                <MenuItem fontWeight="500" borderWidth="1px" borderTop="none" display={"flex"} borderLeft="none" borderRight="none" gap={"10px"} onClick={() => navigate("/booked/appointments")}>
                  <GrSchedules fontSize={"23px"} />
                  Appointments
                </MenuItem>
              )}

              {user.role === "admin" && (
                <MenuItem fontWeight="500" borderWidth="1px" borderTop="none" display={"flex"} borderLeft="none" borderRight="none" gap={"10px"} onClick={() => navigate("/admin")}>
                  <FiSettings fontSize={"23px"} />
                  Admin Dashboard
                </MenuItem>
              )}

              <MenuItem fontWeight="500" borderWidth="1px" borderTop="none" display={"flex"} borderLeft="none" borderRight="none" borderBottom="none" gap={"10px"} onClick={handleLogout}>
                <FiLogOut fontSize={"23px"} />
                Logout
              </MenuItem>

            </MenuList>
          </Menu>
        </Box>
      ) : (
        // If the user is not logged in, show the "Login" link
        <Link to="/login">
          <Button colorScheme="white" variant="solid">
            Login
          </Button>
        </Link>
      )}

    </Flex>
  );
};

export default Navbar;
