import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Spacer, Image } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="blue.500" py={4} px={8}>
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Image src="https://projectimageslaksh.s3.ap-south-1.amazonaws.com/WhatsApp%20Image%202023-07-18%20at%208.17.18%20PM.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAIaCmFwLXNvdXRoLTEiRjBEAiBTV6xep0b9RFUGZOay56KK2vZydWHmI3MAKEyDxfhuqAIgSmhLpOd%2BxyrZ2l%2BXs%2FOWrB05MOkLnsPze42A7o8oe58q7QIIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2MDc2NzQ4MDU2MTEiDKdao2mcpJqgM%2BuwdirBAt1dO5NlhntToYY5X2WWvQ8YQJLe4x90tRPG8NKYsAXZtJ3%2BIGImZ8A%2BvCdPRya%2Fa7HKk3OILLwmUashxmCe%2BXflmNgthEGmXym7WmwQMWjSF9opi1jkiVDUe3hLfasoNUTMLIfs1Wb5KPB3c7ToTJZItjkW1aduELaN0x%2BxsefALTfb6kME%2F9YyV%2FpOg4eELPQ3lxuqtZ%2FtM9%2FfT7iJKTx8TElL8%2Bvd5q%2FWjR%2B3J0LLLpv7LY5tDeFVPS3bg46s2VTb8Bv69kEhDSVL7pTReVw7AZkZAy%2BuxKp9PPpDWzUb7PxefPLUS62kvM09JLYFK%2B3PLfynTXa0mLryiCSL4rr1GjvUnp1UCiJUnC%2BguQdLrh19YwUwICPSfh8tOVidrCK0cv%2B7wzhdU6EHEviyWEYUSBdChvajYi7fv4msgWgkQDCnkN6lBjq0Aj%2Fod7xhgJ4uNkUh56s3sj2KuM7dCm62kTlIsN%2F3sKFeQzis9zucpFqaXKSZuUUifk7UgemYoK4E5tQsQwzaMdwSaFBTLmnncLalFbGUBnOe5NlHomlK%2BwuVvcI5ht9Ia1JLaDwIo6l06bzO4P5spLShEVYWxL8PPuSf%2BpTBtNfZazddv8vxZGvL2rpVtfAdDbSU7mBBTyQ1NYXgqIZ85jbHPeMVn%2BZg%2BBoIndS6pstaLYgKoPus9vzvgXzFcfET5WWUP82AHEhDzvfjzaSv5ibVh0KJSgjQiYf%2F3A2zqx98wdkkCWHG8FOw95qVgr2CqghJoTigz1Pb8mnT9YPLHkFi0smGwXz8owaY%2B3F8wlo3jMeButYO8RuH9RV2swJ0T8rvWP%2Fo8Dcyr%2FNMFuV%2FPTowZ3ZN&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230719T103313Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAY27B5VVV2KF6ZJ4D%2F20230719%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=175fa0e2cf426286f44efa4f9e7aca1b03f78abc1ad9180596bfe98fc792a8ea" alt="Logo" w={40} mr={4} />
        </Link>
        <Spacer />
        <Flex align="center">
          <Link to="/" color="white" mr={4}>Home</Link>
          <Link to="/about" color="white" mr={4}>About</Link>
          <Link to="/contact" color="white">Contact</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
