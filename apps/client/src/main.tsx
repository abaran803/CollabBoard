import { createRoot } from 'react-dom/client';
import '@src/index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import routes from '@src/routes';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
