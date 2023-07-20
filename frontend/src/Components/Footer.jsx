import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py="4">
      <Flex direction="column" align="center" justify="center">
        <Flex flexWrap="wrap" justify="center">
          <Flex direction="column" mx={2}>
            <Text fontSize="lg" fontWeight="bold" mb="2">
              GlamConnect
            </Text>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/cities">Cities</Link>
          </Flex>
          <Flex direction="column" mx={2}>
            <Text fontSize="lg" fontWeight="bold" mb="2">
              Legal
            </Text>
            <Link href="/terms-of-service">Terms Of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/content-guidelines">Content Guidelines</Link>
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link href="/3rd-party-licenses">3rd Party Licenses</Link>
          </Flex>
        </Flex>
      </Flex>
      <Box textAlign="center" mt="4">
        <Text fontSize="sm" color="gray.400">
          &copy; {new Date().getFullYear()} GlamConnect. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
