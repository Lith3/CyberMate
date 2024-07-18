import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import { AuthentificationContext } from "../../assets/use_context/Authentification";
import notify from "../../utils/notify";

function NavBar() {
  const { auth, update, setUpdate } = useContext(AuthentificationContext);
  const URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const disconnect = async () => {
    try {
      const response = await fetch(`${URL}/user/logout`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (response.status === 200) {
        setUpdate(!update);
        notify("Vous êtes déconnecté", "success");
        navigate("/connexion");
      }
    } catch (error) {
      notify("Erreur", "error");
    }
  };
  return (
    <nav>
      <NavLink className="navItem" to="/topics">
        Topics
      </NavLink>
      {auth === true ? (
        <>
          <NavLink className="navItem" to="/profil">
            Profil
          </NavLink>
          <button
            type="button"
            id="disconnectButton"
            className="navItem"
            onClick={disconnect}
          >
            Déconnexion
          </button>{" "}
        </>
      ) : (
        <>
          <NavLink className="navItem" to="/inscription">
            Inscription
          </NavLink>
          <NavLink className="navItem" to="/connexion">
            Connexion
          </NavLink>{" "}
        </>
      )}
    </nav>
  );
}

export default NavBar;
