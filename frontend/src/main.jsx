import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import Context from './contextAPI/Context';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Context>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Context>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
