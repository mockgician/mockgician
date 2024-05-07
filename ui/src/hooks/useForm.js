import { useState, useCallback } from 'react';

const useForm = () => {
  const [enteredValues, setEnteredInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChangeInput = (event) => {
    const { name, value, validationMessage } = event.target;

    // Update input values
    setEnteredInputValues({
      ...enteredValues,
      [name]: value,
    });

    // Update error messages
    setErrors({
      ...errors,
      [name]: validationMessage,
    });

    // Determine if the form is valid
    const form = event.target.closest('form');
    setIsFormValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setEnteredInputValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setEnteredInputValues, setErrors, setIsFormValid]
  );

  return {
    enteredValues,
    errors,
    handleChangeInput,
    isFormValid,
    resetForm,
  };
};

export default useForm;