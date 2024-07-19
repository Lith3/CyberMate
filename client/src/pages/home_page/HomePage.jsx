import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import CyberGirl from "../../assets/images/cybergirl.png";

function HomePage() {
  const navigate = useNavigate();
  return (
    <main id={styles.container}>
      <div className={styles.homeContainer}>
        <h1>CyberMate</h1>
        <div id={styles.buttonContainer}>
          <button
            id={styles.account}
            className="button1"
            type="button"
            onClick={() => navigate("/inscription")}
          >
            CRÉEZ VOTRE COMPTE
          </button>
          <button
            id={styles.connect}
            className="button2"
            type="button"
            onClick={() => navigate("/connexion")}
          >
            CONNECTEZ-VOUS
          </button>
        </div>
      </div>
      <div id={styles.imageContainer}>
        <img
          className={styles.avatar}
          src={CyberGirl}
          alt="Femme de profile tenant un pistolet"
        />
      </div>
    </main>
  );
}

export default HomePage;
