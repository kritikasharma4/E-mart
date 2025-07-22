import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login"; // ✅ Import your Login component
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/ProductUpload";
import ProductList from "./pages/ProductList";
import CategoryAdd from "./pages/CategoryAdd";
import CategoryList from "./pages/CategoryList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyContext = createContext();

const theme = createTheme({
  // Customize your MUI theme here
});

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent values={values} />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

// ✅ This wrapper allows us to use `useLocation` hook to conditionally render
function AppContent({ values }) {
  const location = useLocation();

  // Hide Header & Sidebar on login page
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";


  return (
    <MyContext.Provider value={values}>
      {!hideLayout && <Header />}
      <div className="main d-flex">
        {!hideLayout && (
          <div className={`sidebarWrapper ${values.isToggleSidebar ? "toggle" : ""}`}>
            <Sidebar />
          </div>
        )}

        <div className={`content ${values.isToggleSidebar ? "toggle" : ""}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/upload" element={<ProductUpload />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/c-upload" element={<CategoryAdd />} />
            <Route path="/category-list" element={<CategoryList />} />
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
export { MyContext };
