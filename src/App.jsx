import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthGuard from "./components/AuthGuard";

// Simple default route that redirects based on auth presence
const DefaultRoute = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  if (authData) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthGuard requiredAuth={false}><Login /></AuthGuard>
    },
    {
      path: "/register",
      element: <AuthGuard requiredAuth={false}><Register /></AuthGuard>
    },
    {
      path: "/",
      element: <DefaultRoute />
    },

    // Protected Dashboard Route
    {
      path: "/dashboard",
      element: <AuthGuard requiredAuth={true}><Dashboard /></AuthGuard>
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
