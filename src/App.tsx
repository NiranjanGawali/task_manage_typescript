import './App.css';
import AllRoutes from './routes/AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import img from './assets/raychan-background.jpg';
// import img1 from './assets/yellow-gradient.jpg';
// import img2 from './assets/blue-bg-img.jpg';
// import img3 from './assets/pawel-czerwinski-2PN18U8CKi0-unsplash.jpg';

import { MemorizedSpinner } from './components';
import { useCommonContext } from './hooks';
import ScrollToTop from './components/Other/ScrollToTop';

function App() {
  // contexts
  const { showSpinner } = useCommonContext();

  return (
    <div
    // className='bg-cover bg-no-repeat bg-center bg-fixed'
    // style={{ backgroundImage: `url(${img3})` }}
    >
      {showSpinner && <MemorizedSpinner />}
      <ScrollToTop />
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
