import '../styles/globals.css';
import { EventProvider } from '../context/EventContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <EventProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </EventProvider>
  );
}

export default MyApp; 