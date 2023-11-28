import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./styles/global.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './components/footer/Footer';

const queryClient = new QueryClient();
const Home = lazy(() => import("./pages/home/Home"));
const WebCollection = lazy(() => import("./pages/webCollection/WebCollection"));
const StockAlert = lazy(() => import("./pages/stockAlert/StockAlert"));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const Layout = () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="main">
          <Navbar />
          <div className="container">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (<Suspense fallback={<>Loading...</>}><Home /></Suspense>)
        },    
        {
          path: "/webcollection",
          element: (<Suspense fallback={<>Loading...</>}><WebCollection /></Suspense>)
        },
        {
          path: "/stockAlert",
          element: (<Suspense fallback={<>Loading...</>}><StockAlert /></Suspense>)
        }
      ]
    },
  ], { basename: import.meta.env.BASE_URL });

  return <RouterProvider router={router} />;
}

export default App;
