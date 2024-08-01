import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./NewPassword.module.css";

function NewPassword({ passwordBox, setPasswordBox }) {
  const [oldPassword, setOldPassword] = useState("");

  const [passwordForm, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const { password } = Object.fromEntries(formData.entries());

      const response = await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (response.status === 201) {
        toast.success("Votre mot de passe à bien été changé");
      } else {
        const errorData = await response.json();
        toast.error(errorData.validationErrors[0].message);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className={styles.passwordBoxContainer}>
      <div id={styles.passwordBox}>
        <form
          method="post"
          className={styles.passwordContainer}
          onSubmit={handleSubmit}
        >
          <div className={styles.inputContainer}>
            <label className="labelSizeM" htmlFor="password">
              Mot de passe actuel
            </label>
            <input
              className="inputSizeM"
              type="password"
              name="password"
              value={oldPassword}
              minLength={12}
              required
              onChange={(event) => handleInputChange(event, setOldPassword)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label className="labelSizeM" htmlFor="password">
              Nouveau mot de passe
            </label>
            <input
              className="inputSizeM"
              type="password"
              name="newPassword"
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
          <div>
            <div id={styles.confirmPassowrd} className={styles.inputContainer}>
              <label className="labelSizeM" htmlFor="passwordConf">
                Confirmer nouveau mot de passe
              </label>
              <input
                className="inputSizeM"
                type="password"
                name="passwordConf"
                minLength={12}
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
          </div>
          <div className={styles.buttonContainer}>
            <button
              id={styles.button}
              className="button2"
              type="button"
              onClick={() => setPasswordBox(!passwordBox)}
            >
              ANNULER
            </button>
            <button
              id={styles.confirmButton}
              className="button1"
              type="submit"
              // onClick={() => setPasswordBox(!passwordBox)}
              disabled={passwordForm !== passwordConf}
            >
              VALDER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewPassword.propTypes = {
  passwordBox: PropTypes.bool.isRequired,
  setPasswordBox: PropTypes.func.isRequired,
};

export default NewPassword;
