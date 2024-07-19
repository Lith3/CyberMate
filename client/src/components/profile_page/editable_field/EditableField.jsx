import PropTypes from "prop-types";
import styles from "./EditableField.module.css";

function EditableField({ label, value, isEditMode, valueName, onChange }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly={isEditMode === false}
        onChange={
          isEditMode === true ? (e) => onChange(e, valueName) : undefined
        }
        className={`${isEditMode === false ? styles.readOnlyInput : `${styles.input}`}`}
      />
    </div>
  );
}

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  valueName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableField;
