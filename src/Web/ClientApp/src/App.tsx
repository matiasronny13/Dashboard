import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./styles/globalApp.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Home = lazy(() => import("./pages/home/Home"));
const Rss = lazy(() => import("./pages/rss/Rss"));

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
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
          path: "/rss",
          element: (<Suspense fallback={<>Loading...</>}><Rss /></Suspense>)
        }
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
