// edit profile form validation
const validateUpdateProfileForm = (userData, setError) => {
  const { username, email, currentPassword, newPassword, confirmNewPassword } =
    userData;

  if (username && email) {
    setError('username', {
      type: 'manual',
      message: "You can't update username and email together",
    });
    setError('email', {
      type: 'manual',
      message: "You can't update username and email together",
    });
    return false;
  }

  if (!currentPassword && newPassword) {
    setError('currentPassword', {
      type: 'manual',
      message: 'Current password is required to update the password',
    });
    return false;
  }

  if (currentPassword && !newPassword) {
    setError('newPassword', {
      type: 'manual',
      message: 'Enter the new password, if you want to update',
    });
    return false;
  }

  if (newPassword && !confirmNewPassword) {
    setError('confirmNewPassword', {
      type: 'manual',
      message: 'Please confirm your new password',
    });
    return false;
  }

  if (!newPassword && confirmNewPassword) {
    setError('newPassword', {
      type: 'manual',
      message: 'Enter new password, if you want to update',
    });
    return false;
  }

  if (newPassword !== confirmNewPassword) {
    setError('newPassword', { type: 'manual', message: 'Passwords not match' });
    setError('confirmNewPassword', {
      type: 'manual',
      message: 'Passwords not match',
    });
    return false;
  }

  // if any of the above condition not met
  return true;
};

export default validateUpdateProfileForm;
