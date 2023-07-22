import './App.css';
import AllPages from './Pages/AllPages';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Context from './contextAPI/Context';

const baseServerURL = "http://localhost:8080";

function App() {
  return (
    <Context>
      <Navbar baseServerURL={baseServerURL} />
      <AllPages baseServerURL={baseServerURL} />
      <Footer />
    </Context>
  );
}

export default App;
