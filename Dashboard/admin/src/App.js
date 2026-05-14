import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import { createContext, useState, useCallback, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import ProductList from "./pages/ProductList";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryList from "./pages/CategoryList";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";

const MyContext = createContext();
const theme = createTheme();

function ProtectedRoute({ children }) {
  const { adminUser } = useContext(MyContext);
  if (!adminUser) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const { isToggleSidebar, adminUser } = useContext(MyContext);
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      <div className="main d-flex">
        {!hideLayout && (
          <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
            <Sidebar />
          </div>
        )}
        <div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
          <Routes>
            <Route path="/login" element={adminUser ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/product" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><ProductUpload /></ProtectedRoute>} />
            <Route path="/product-list" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/c-upload" element={<ProtectedRoute><CategoryAdd /></ProtectedRoute>} />
            <Route path="/category-list" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [adminUser, setAdminUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("adminUser")) || null; }
    catch { return null; }
  });

  const loginAdmin = useCallback((user, token) => {
    localStorage.setItem("adminUser", JSON.stringify(user));
    localStorage.setItem("adminToken", token);
    setAdminUser(user);
  }, []);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setAdminUser(null);
  }, []);

  const values = { isToggleSidebar, setIsToggleSidebar, adminUser, loginAdmin, logoutAdmin };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <AppLayout />
          <ToastContainer position="top-right" autoClose={3000} />
        </MyContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
export { MyContext };
