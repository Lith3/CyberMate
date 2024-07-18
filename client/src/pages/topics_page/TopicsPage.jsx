import { useContext, useEffect, useState } from "react";
import styles from "./TopicsPage.module.css";
import NavBar from "../../components/navbar/NavBar";
import magnifier from "../../assets/images/search_neon.png";
import Topic from "../../components/topics_page/topic/Topic";
import notify from "../../utils/notify";
import { AuthentificationContext } from "../../assets/use_context/Authentification";

function TopicsPage() {
  const URL = import.meta.env.VITE_API_URL;
  const { auth } = useContext(AuthentificationContext);
  const [newTopicWidow, setNewTopicWindow] = useState(false);
  const [change, setChange] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/topic`);
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const jsonData = await response.json();
        setTopics(jsonData);
      } catch (error) {
        notify("Erreur de réseau de connexion", "error");
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [URL, change]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const { title, subject } = Object.fromEntries(formData.entries());

      const response = await fetch(`${URL}/topic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, subject }),
        credentials: "include",
      });

      if (response.status === 201) {
        notify("Nouveau topic créé !", "success");
        setNewTopicWindow(!newTopicWidow);
        setChange(!change);
      }
      if (response.status === 401) {
        setNewTopicWindow(!newTopicWidow);
        notify("Vous devez être connecté pour pouvoir faire ça !", "error");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        {" "}
        <header id={styles.header}>
          <div id={styles.searchContainer}>
            <span id={styles.inputContainer}>
              <img id={styles.magnifier} src={magnifier} alt="une loupe bleu" />
              <input id={styles.searchInput} type="text" />
            </span>
            <button
              id={styles.newTopicButton}
              className={`button1 ${auth !== true && styles.disable}`}
              type="button"
              onClick={() => setNewTopicWindow(!newTopicWidow)}
              disabled={auth !== true}
            >
              NOUVEAU TOPIC
            </button>
          </div>
        </header>
        <main>
          {newTopicWidow === true && (
            <div id={styles.newTopicContainer}>
              <div id={styles.newTopic}>
                <form
                  id={styles.textContainer}
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    id={styles.title}
                    placeholder="Titre"
                    name="title"
                    min={4}
                    max={60}
                  />
                  <textarea
                    id={styles.subject}
                    name="subject"
                    min={4}
                    placeholder="Sujet"
                  />
                  <span className={styles.buttonContainer}>
                    <button
                      className={`button2 ${styles.widowTopicButton}`}
                      id={styles.cancelButton}
                      type="button"
                      onClick={() => setNewTopicWindow(!window)}
                    >
                      ANNULER
                    </button>
                    <button
                      id={styles.createTopic}
                      className={`button1 ${styles.widowTopicButton}`}
                      type="submit"
                    >
                      CREER
                    </button>
                  </span>
                </form>
              </div>
            </div>
          )}
          {topics.length > 0 ? (
            <ul id={styles.topicList}>
              {topics.map((topic) => (
                <li className={styles.topicContainer} key={topic.id}>
                  <Topic topic={topic} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.loading}>...</p>
          )}
        </main>
      </div>
    </>
  );
}

export default TopicsPage;
