import validationRulers from './validationRulers';

const validateData = (formData, setInvalidFields) => {
  const validatedData = validationRulers(formData);

  const invalidFields = validatedData.reduce(
    (errors, { name, message, isValid }) => {
      if (!isValid) {
        errors[name] = message;
      }
      return errors;
    },
    {}
  );
  setInvalidFields(invalidFields);

  return validatedData.filter(obj => !obj.isValid);
};

export default validateData;
