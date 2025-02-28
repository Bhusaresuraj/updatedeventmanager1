import '../styles/globals.css';
import { EventProvider } from '../context/EventContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <EventProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
      <Toaster position="top-right" />
    </EventProvider>
  );
}

export default MyApp; 