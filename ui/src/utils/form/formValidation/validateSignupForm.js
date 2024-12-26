const validateSignupForm = (userData, setError) => {
  const { password, confirmPassword } = userData;

  if (password !== confirmPassword) {
    setError('password', { type: 'manual', message: 'Passwords mismatch' });
    setError('confirmPassword', {
      type: 'manual',
      message: 'Passwords mismatch',
    });
    return false;
  }
  return true;
};

export default validateSignupForm;
