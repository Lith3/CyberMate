import { useState } from "react";
import { Link } from "react-router-dom";
import notify from "../../utils/notify";
import girlGun from "../../assets/images/girlGun.png";
import styles from "./SignUp.module.css";

function SignUp() {
  const URL = import.meta.env.VITE_API_URL;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/;
  const [passwordForm, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const { username, email, password } = Object.fromEntries(
        formData.entries()
      );

      const response = await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      if (response.status === 201) {
        notify("Votre compte à bien été crée", "success");
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
            <label className="labelSizeM" htmlFor="username">
              Pseudo
            </label>
            <input
              className="inputSizeM"
              type="text"
              name="username"
              minLength={2}
              maxLength={20}
              required
            />
          </div>
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
              value={passwordForm}
              pattern={passwordRegex.source}
              minLength={12}
              required
              onChange={(event) => handleInputChange(event, setPassword)}
            />
            <div className={styles.smallContainer}>
              {passwordRegex.test(passwordForm) !== true && (
                <small className={styles.incorrect}>
                  Le mot de passe doit comprendre une majuscule, une minuscule,
                  un chiffre et un caractère spécial.
                </small>
              )}
            </div>
          </div>
          <div id={styles.confirmPassowrd} className={styles.inputContainer}>
            <label className="labelSizeM" htmlFor="passwordConf">
              Confirmer votre mot de passe
            </label>
            <input
              className="inputSizeM"
              type="password"
              name="passwordConf"
              minLength={2}
              maxLength={20}
              required
              onChange={(event) => handleInputChange(event, setPasswordConf)}
            />
            <div className={styles.smallContainer}>
              {passwordForm !== passwordConf && (
                <small className={styles.incorrect}>
                  Les mots de passe ne sont pas identiques
                </small>
              )}
            </div>
          </div>
          <button
            id={styles.accountButton}
            className="bouton1"
            type="submit"
            disabled={passwordForm !== passwordConf}
          >
            CREER VOTRE COMPTE
          </button>
          <span id={styles.account}>
            DÉJÀ UN COMPTE ?{" "}
            <Link id={styles.connect} to="/connection">
              CONNECTEZ-VOUS
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

export default SignUp;
