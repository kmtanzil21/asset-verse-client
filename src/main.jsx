import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import { router } from './router/router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './Contexts/AuthProvider.jsx';

const queryClient= new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />,
     </QueryClientProvider>
     </AuthProvider>

  </StrictMode>,
)
