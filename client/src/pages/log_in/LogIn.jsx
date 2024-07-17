import { Link, useNavigate } from "react-router-dom";
import styles from "../sign_up/SignUp.module.css";
import "./LogIn.css";
import girlGun from "../../assets/images/girlGun.png";
import notify from "../../utils/notify";

function LogIn() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const { email, password } = Object.fromEntries(formData.entries());

      const response = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        notify("Vous êtes connecté", "success");
        navigate("/topic");
      } else {
        notify("Email ou mot de passe incorrect", "error");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <main id={styles.container}>
      <div className={styles.signupContainer}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className="labelSizeM" htmlFor="email">
              Email
            </label>
            <input
              className="inputSizeM"
              type="email"
              name="email"
              placeholder="exemple@exemple.com"
              minLength={6}
              maxLength={60}
              required
            />
          </div>

          <div id={styles.password} className={styles.inputContainer}>
            <label className="labelSizeM" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="inputSizeM"
              type="password"
              name="password"
              //   value={passwordForm}
              required
              //   onChange={(event) => handleInputChange(event, setPassword)}
            />
          </div>

          <button id={styles.accountButton} className="bouton1" type="submit">
            CONNECTEZ-VOUS
          </button>
          <span id={styles.account}>
            PAS DE COMPTE ?{" "}
            <Link id={styles.connect} to="/inscription">
              INSCRIVEZ-VOUS
            </Link>
          </span>
        </form>
      </div>
      <div id={styles.imageContainer}>
        <img
          className={styles.avatar}
          src={girlGun}
          alt="Femme de profile tenant un pistolet"
        />
      </div>
    </main>
  );
}

export default LogIn;
