import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../utils/notify";
import styles from "../topics_page/TopicsPage.module.css";
import Message from "../../components/conversation/message/Message";
import NavBar from "../../components/navbar/NavBar";
import ChatBar from "../../components/conversation/chat_bar/ChatBar";

function Conversation() {
  const URL = import.meta.env.VITE_API_URL;
  const [messages, setMessages] = useState([]);
  const topicId = useParams().id;
  const navigate = useNavigate;
  const [newMessage, setNewMessage] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/conversation/${topicId}`, {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 200) {
          const data = await response.json();
          setMessages(data);
        } else {
          navigate("/connexion");
          notify("Vous devez être connecté pour accéder à cette page", "error");
        }
      } catch (error) {
        notify("Erreur de réseau de connexion", "error");
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [URL, navigate, topicId, change]);

  return (
    <>
      <NavBar />
      <main>
        {messages.length > 0 ? (
          <ul className="ulMessage" id={styles.topicList}>
            {messages.map((message) => (
              <li className={styles.topicContainer} key={message.id}>
                {" "}
                <Message message={message} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.loading}>...</p>
        )}
        <ChatBar
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          topicId={topicId}
          setChange={setChange}
          change={change}
        />
      </main>
    </>
  );
}

export default Conversation;
