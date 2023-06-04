import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import styles from './LabelInput.module.css';

const LabelInput = ({
  caption,
  type,
  name,
  pattern,
  title,
  required,
  value,
  onChange,
  ...props
}) => {
  const labelId = nanoid();
  return (
    <label className={styles.labelForm} htmlFor={labelId}>
      {caption}
      <input
        id={labelId}
        className={styles.inputForm}
        type={type}
        name={name}
        pattern={pattern}
        title={title}
        required={required}
        onChange={onChange}
        value={value}
        {...props}
      />
    </label>
  );
};

export default LabelInput;

LabelInput.prototypes = {
  caption: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func,
};
