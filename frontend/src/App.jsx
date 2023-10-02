import './App.css';
import AllPages from './Pages/AllPages';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const baseServerURL = "https://kind-lime-cygnet-hem.cyclic.cloud";

function App() {
  return (
    <>
      <Navbar baseServerURL={baseServerURL} />
      <AllPages baseServerURL={baseServerURL} />
      <Footer />
    </>
  );
}

export default App;
