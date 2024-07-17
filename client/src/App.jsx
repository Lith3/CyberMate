import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthentificationProvider } from "./assets/use_context/Authentification";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <AuthentificationProvider>
        <Outlet />
      </AuthentificationProvider>
    </>
  );
}

export default App;
