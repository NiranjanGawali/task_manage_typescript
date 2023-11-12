import './App.css';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from './assets/raychan-background.jpg';

function App() {
  return (
    <div
      className='bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${img})` }}
    >
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
