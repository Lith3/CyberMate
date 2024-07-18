import { useRef } from "react";
import PropTypes from "prop-types";
import "./ChatBar.css";
import notify from "../../../utils/notify";

function ChatBar({ newMessage, setNewMessage, topicId, setChange, change }) {
  const URL = import.meta.env.VITE_API_URL;
  const textAreaRef = useRef(null);

  const submitMessage = async (event) => {
    if (event.key === "Enter" && newMessage !== "") {
      textAreaRef.current.textContent = "";
      try {
        const response = await fetch(`${URL}/conversation/${topicId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newMessage }),
          credentials: "include",
        });
        if (response.status !== 201) {
          notify("Erreur de connexion", "error");
        }
        setChange(!change);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  };

  return (
    <div id="chatBarContainer">
      <div id="chatBar">
        <div
          ref={textAreaRef}
          className="messageBar"
          role="textbox"
          contentEditable="true"
          onInput={() => setNewMessage(textAreaRef.current.textContent)}
          onKeyDown={submitMessage}
          tabIndex="0"
          aria-label="Message input"
        />
      </div>
    </div>
  );
}

ChatBar.propTypes = {
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  topicId: PropTypes.string.isRequired,
  change: PropTypes.bool.isRequired,
  setChange: PropTypes.func.isRequired,
};
export default ChatBar;
