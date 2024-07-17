import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav>
      <span>TeST</span>
      <NavLink className={styles.navItem} to="/profil">
        Profil
      </NavLink>
      <NavLink className={styles.navItem} to="/connexion">
        Déconnexion
      </NavLink>
    </nav>
  );
}

export default NavBar;
