import PropTypes from "prop-types";
import styles from "../../topics_page/topic/Topic.module.css";
import "./Message.css";

function Message({ message }) {
  return (
    <div className={`${styles.topic} messageContainer`}>
      <div className={`${styles.topicHeader} gap `}>
        <img
          className="messageAvatar"
          src={message.avatar}
          alt={`avatar de l'utilisateur ${message.username}`}
        />
        <span className="messageHeader">
          <p className="messageUsername">{message.username}</p>
          <p className="messageDate">{message.date}</p>
        </span>
      </div>
      <p className={styles.topicSubject}>{message.content}</p>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
