import { useRef, useState } from "react";
import "./ChatBar.css";

function ChatBar() {
  const textAreaRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  const submitMessage = async (event) => {
    event.preventDefault();
    if (event.key === "Enter" && newMessage !== "") {
      textAreaRef.current.textContent = "";
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
          onInput={() => {
            setNewMessage(textAreaRef.current.textContent);
          }}
          onKeyDown={submitMessage}
          tabIndex="0"
          aria-label="Message input"
        />
      </div>
    </div>
  );
}

export default ChatBar;
