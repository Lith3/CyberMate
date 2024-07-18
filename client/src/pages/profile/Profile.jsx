import { useLoaderData, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Profile.module.css";
import Avatar from "../../assets/images/nain.png";
import EditableField from "../../components/profile_page/EditableField";
import notify from "../../utils/notify";

function Profile() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const userData = useLoaderData();
  const [confirmBox, setConfirmBox] = useState(false);

  // Create initial State for the useReducer hook
  const initialState = {
    user: { ...userData },
    beforeChange: { ...userData },
    isEditMode: false,
  };

  // Create the different actions that will be used in UseReducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CUSTOMER":
        return { ...state, user: action.payload };
      case "SET_BEFORE_CHANGE":
        return { ...state, beforeChange: action.payload };
      case "TOGGLE_EDIT_MODE":
        return { ...state, isEditMode: !state.isEditMode };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // update customer info according to what they write
  const onChange = (e, champ) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: { ...state.user, [champ]: e.target.value },
    });
  };

  // Send the users updates
  const handleEditClick = async () => {
    try {
      if (state.isEditMode === true && state.beforeChange !== state.user) {
        // Determine the endpoint based on user type}
        // Prepare the values to be sent based on user type
        const values = {
          username: state.user.username,
          email: state.user.email,
        };

        // Send the PUT request to update the customer information
        const response = await fetch(`${URL}/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        if (response.status === 204) {
          dispatch({ type: "SET_BEFORE_CHANGE", payload: state.user });
          dispatch({ type: "TOGGLE_EDIT_MODE" });
          notify("Informations mises à jour avec succès !", "success");
        }
        const data = await response.json();
        notify(data.validationErrors[0].message, "error");
      } else {
        dispatch({ type: "TOGGLE_EDIT_MODE" });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Delete account button

  const deleteAccount = async () => {
    try {
      const response = await fetch(`${URL}/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 204) {
        notify("Votre compte a été supprimé", "success");
        navigate("/connexion");
      } else notify("Une erreur est survenue", "error");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
  return (
    <>
      <NavBar />
      <main id={styles.container}>
        {confirmBox === true && (
          <div className={styles.confirmBoxContainer}>
            <div id={styles.confirmBox}>
              <p className={styles.textConfirmBox}>
                Êtes-vous sûr de vouloir supprimer votre compte ?
              </p>
              <div className={styles.deleteConf}>
                {" "}
                <button
                  className={`button2 ${styles.buttonConfBox}`}
                  type="button"
                  onClick={() => setConfirmBox(!confirmBox)}
                >
                  ANNULER
                </button>
                <button
                  className={`${styles.delete} ${styles.buttonConfBox}`}
                  type="button"
                  onClick={deleteAccount}
                >
                  SUPPRIMER
                </button>
              </div>
            </div>{" "}
          </div>
        )}
        <div id={styles.profile}>
          <section className={styles.sectionOne}>
            <div id={styles.avatarContainer}>
              <img
                id={styles.avatar}
                src={Avatar}
                alt="Avatar de l'utilisateur"
              />
            </div>
            <div id={styles.buttonContainer}>
              {state.isEditMode === true ? (
                <>
                  <button
                    className={`button1 ${styles.button}`}
                    type="button"
                    onClick={handleEditClick}
                  >
                    SAUVERGARDER
                  </button>
                  <button
                    className={`button2 ${styles.button}`}
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE" })}
                  >
                    ANNULER
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`button2 ${styles.button}`}
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE_EDIT_MODE" })}
                  >
                    EDITER
                  </button>
                  <button
                    className={`${styles.delete} ${styles.button}`}
                    type="button"
                    onClick={() => setConfirmBox(!confirmBox)}
                  >
                    SUPPRIMER
                  </button>
                </>
              )}
            </div>
          </section>
          <section className={styles.sectionTwo}>
            <div id={styles.inputContainer}>
              <EditableField
                label="Username"
                value={state.user.username}
                isEditMode={state.isEditMode}
                valueName="username"
                onChange={onChange}
              />
              <EditableField
                label="Email"
                value={state.user.email}
                isEditMode={state.isEditMode}
                valueName="username"
                onChange={onChange}
              />
              <EditableField
                label="Avatar"
                value="Soon"
                isEditMode={state.isEditMode}
                valueName="username"
                onChange={() => {}}
              />
            </div>
            <div id={styles.security}>
              <p className={styles.label}>Securité</p>
              <span className={styles.row}>
                <button className="button2" id={styles.password} type="button">
                  CHANGER DE MOT DE PASSE
                </button>
              </span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Profile;
