import { redirect } from "react-router-dom";
import notify from "../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const profileLoader = async () => {
  try {
    const response = await fetch(`${URL}/user/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 401 || response.status === 403) {
      notify("Vous devez être connecté pour accéder à cette partie", "error");
      return redirect("/connexion");
    }
    if (response.status !== 200) {
      notify("Erreur lors de la récupération des données du profil !", "error");
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch profile error:", err);
    return notify(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
      "error"
    );
  }
};

export default profileLoader;
