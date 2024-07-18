import { redirect } from "react-router-dom";
import notify from "../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const conversationLoader = async () => {
  try {
    const response = await fetch(`${URL}/auth`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status !== 200) {
      return redirect("/acces_refuse");
    }

    return response.status;
  } catch (err) {
    console.error("Fetch profile error:", err);
    return notify(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
      "error"
    );
  }
};

export default conversationLoader;
