import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const profileLoader = async () => {
  try {
    const response = await fetch(`${URL}/user/profile`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 401 || response.status === 403) {
      toast.error("Vous devez être connecté pour accéder à cette partie");
      return redirect("/connexion");
    }
    if (response.status !== 200) {
      toast.error("Erreur lors de la récupération des données du profil !");
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch profile error:", err);
    return toast.error(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard."
    );
  }
};

export default profileLoader;
