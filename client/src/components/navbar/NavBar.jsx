import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import { AuthentificationContext } from "../../assets/use_context/Authentification";

function NavBar() {
  const { auth } = useContext(AuthentificationContext);

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
          <NavLink className="navItem" to="/connexion">
            Déconnexion
          </NavLink>{" "}
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
