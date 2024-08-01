import { useLoaderData, useNavigate } from "react-router-dom";
import { useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../../components/navbar/NavBar";
import styles from "./Profile.module.css";
import EditableField from "../../components/profile_page/editable_field/EditableField";
import NewPassword from "../../components/profile_page/new_password/NewPassword";

function Profile() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const userData = useLoaderData();
  const [confirmBox, setConfirmBox] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [passwordBox, setPasswordBox] = useState(false);

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
          toast.success("Informations mises à jour avec succès !");
        }
        const data = await response.json();
        toast.error(data.validationErrors[0].message);
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
        toast.success("Votre compte a été supprimé");
        navigate("/");
      } else toast.error("Une erreur est survenue");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Image upload

  const avatarImg = useRef(null);

  const handleClick = () => {
    if (avatarImg.current) {
      avatarImg.current.click();
    }
  };

  const imageHandler = async (event) => {
    event.preventDefault();
    setChangeAvatar(!changeAvatar);
    const formData = new FormData(event.target);
    try {
      const response = await fetch(`${URL}/user/image`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (response.status !== 204) {
        toast.error(
          "Erreur lors de l'upload de limage, verifier que votre image fait moins de 1 mo et qu'elle est du type jpeg/jpg/png/gif"
        );

        throw new Error("Erreur lors du téléchargement de l'image");
      }

      if (response.status === 204) {
        toast.success("Image téléchargée avec succès");
        setTimeout(() => {
          window.location.reload();
        }, "1000");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  return (
    <>
      <NavBar />
      <main id={styles.container}>
        {passwordBox === true && (
          <NewPassword
            passwordBox={passwordBox}
            setPasswordBox={setPasswordBox}
          />
        )}
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
        {changeAvatar === true && (
          <div className={styles.confirmBoxContainer}>
            <div id={styles.confirmBox}>
              <form
                className={styles.fileContainer}
                onSubmit={imageHandler}
                encType="multipart/form-data"
                method="post"
              >
                {" "}
                <button
                  id={styles.uploadButton}
                  type="button"
                  onClick={handleClick}
                >
                  Choisir une image
                </button>
                <input
                  name="avatar"
                  id={styles.inputFile}
                  type="file"
                  ref={avatarImg}
                />
                <button
                  id={styles.validateFile}
                  className="button1"
                  type="submit"
                >
                  VALIDER
                </button>
              </form>
            </div>
          </div>
        )}
        <div id={styles.profile}>
          <section className={styles.sectionOne}>
            <div id={styles.avatarContainer}>
              <img
                id={styles.avatar}
                src={userData.avatar}
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
                    ÉDITER
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
                label="Pseudo"
                value={state.user.username}
                isEditMode={state.isEditMode}
                valueName="username"
                onChange={onChange}
              />
              <EditableField
                label="Email"
                value={state.user.email}
                isEditMode={state.isEditMode}
                valueName="email"
                onChange={onChange}
              />
              <div className={styles.field}>
                <p id={styles.avatarLabel} className={styles.label}>
                  Avatar
                </p>
                <button
                  className={`${styles.avatarButton} ${styles.button}`}
                  type="button"
                  onClick={() => setChangeAvatar(!changeAvatar)}
                >
                  CHANGER D'IMAGE
                </button>
              </div>
            </div>
            <div id={styles.security}>
              <p className={styles.label}>Securité</p>
              <span className={styles.row}>
                <button
                  className="button2"
                  id={styles.password}
                  type="button"
                  onClick={() => setPasswordBox(!passwordBox)}
                >
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
