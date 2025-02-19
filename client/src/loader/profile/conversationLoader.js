import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const conversationLoader = async () => {
  try {
    const response = await fetch(`${URL}/auth`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      toast.error("Vous devez être connecté pour accéder à cette partie");
      return redirect("/connexion");
    }

    return response.status;
  } catch (err) {
    console.error("Fetch profile error:", err);
    return toast.error(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard."
    );
  }
};

export default conversationLoader;
