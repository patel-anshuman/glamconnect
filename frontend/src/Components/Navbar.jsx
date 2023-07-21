import React from "react";
import { FiLogOut } from "react-icons/fi";
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

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  // Mock user data retrieved from localStorage
  const user = {
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
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
      <Text as="a" href="/" fontWeight="bold" fontSize="2xl" color="white">
        GlamConnect
      </Text>

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
        >
          <Text
            as="a"
            href="#"
            px={2}
            py={1}
            _hover={{ textDecoration: "underline" }}
          >
            Home
          </Text>
          <Text
            as="a"
            href="#"
            px={2}
            py={1}
            _hover={{ textDecoration: "underline" }}
          >
            Services
          </Text>
          <Text
            as="a"
            href="#"
            px={2}
            py={1}
            _hover={{ textDecoration: "underline" }}
          >
            About
          </Text>
        </Flex>
      </Box>

      {/* User Dropdown */}
      <Box display="flex" alignItems="center" border="md" gap="5px" color="grey.600">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} bg="white">
            {user.name}
          </MenuButton>
          <MenuList>
            <MenuItem fontWeight="500" borderWidth="1px" display={"flex"} borderTop="none" borderLeft="none" borderRight="none" gap={"10px"}><MdAccountCircle fontSize={"23px"}/>My Account</MenuItem>
            <MenuItem fontWeight="500" borderWidth="1px" borderTop="none" display={"flex"} borderLeft="none" borderRight="none" gap={"10px"}><GrSchedules fontSize={"23px"}/>Appointments</MenuItem>
            <MenuItem fontWeight="500" borderWidth="1px" borderTop="none" display={"flex"} borderLeft="none" borderRight="none" borderBottom="none" gap={"10px"}><FiLogOut fontSize={"23px"}/>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
