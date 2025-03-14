import { BrowserRouter } from 'react-router-dom';
import Routes from './routes.tsx';
import { ToastContainer } from 'react-toastify';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v6';

export default function App() {
  return (
    <NuqsAdapter>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </NuqsAdapter>
  );
}
