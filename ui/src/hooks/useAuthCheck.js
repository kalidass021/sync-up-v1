import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import {
  useAuthCheckQuery,
  useSignoutMutation,
} from '../redux/api/authApiSlice';
import { signout } from '../redux/features/auth/authSlice';

const useAuthCheck = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const authResponse = useAuthCheckQuery();
  const dispatch = useDispatch();
  const [signoutApiCall] = useSignoutMutation();

  const handleSignout = useCallback(async () => {
    try {
      await signoutApiCall().unwrap();
      dispatch(signout());
      toast.info('Authentication cookie missing. Please sign in again');
      setIsAuthorized(false);
    } catch (err) {
      console.error(`Error while signout ${err?.data?.message}`);
      toast.error(err?.data?.message);
    }
  }, [dispatch, signoutApiCall]);

  useEffect(() => {
    const isUnauthorizedError =
      authResponse?.error?.data?.message === 'Unauthorized: No token provided';

      console.log(isUnauthorizedError, 'isUnauthorizedError');
    // if the error is unauthorized error (cookie not present) signout the user
    if (isUnauthorizedError) {
      handleSignout();
    }
  }, [authResponse, handleSignout]);

  return isAuthorized;
};

export default useAuthCheck;
