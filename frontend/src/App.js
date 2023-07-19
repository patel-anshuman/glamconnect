import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import AllPages from './Pages/AllPages';
import Navbar from './Components/Navbar';
function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <AllPages />
    </ChakraProvider>
  );
}

export default App;
