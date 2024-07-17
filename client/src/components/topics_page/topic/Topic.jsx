import PropTypes from "prop-types";
import styles from "./Topic.module.css";

function Topic({ topic }) {
  return (
    <div className={styles.topic}>
      <span className={styles.topicHeader}>
        <h2>{topic.title}</h2>
        <p className={styles.TopicdateTopic}>{topic.date}</p>
      </span>
      <p className={styles.author}>Auteur : {topic.username}</p>
      <p className={styles.topicSubject}>{topic.subject}</p>
    </div>
  );
}

Topic.propTypes = {
  topic: PropTypes.shape({
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default Topic;
