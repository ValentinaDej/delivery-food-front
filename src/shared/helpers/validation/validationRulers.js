const validationRulers = formState => {
  const newFormState = formState.map(field => {
    let isValid = true;
    let message = '';

    switch (field.name) {
      case 'address':
        isValid = field.value !== '';
        message = 'Input address';
        break;
      case 'email':
        isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          field.value
        );
        message = 'Input email';
        break;
      case 'phone':
        isValid = field.value !== '';
        message = 'Input phone';
        break;
      case 'name':
        isValid = /[a-zA-Zа-яА-ЯҐґІіЇїЄєЪъЫыЭэ]{2,60}$/u.test(field.value);
        message = 'Input name';
        break;
      default:
        break;
    }

    return { ...field, isValid, message };
  });

  return newFormState;
};

export default validationRulers;
