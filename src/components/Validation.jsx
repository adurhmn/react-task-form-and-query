//Third party imports
import { useGetAuthData } from "../hooks/queryHooks";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

//Local imports
import { useGetUserdata } from "../hooks/queryHooks";
import { authSliceActions } from "../store/authSlice";
import Loading from "../Utils/Loading";

const Validation = (props) => {
  const {
    data: auth,
    isLoading: authloading,
    isSuccess: authsuccess,
  } = useGetAuthData();
  const {
    data: user,
    isLoading: userloading,
    isSuccess: usersuccess,
  } = useGetUserdata();
  const [sessionValidated, setSessionValidated] = useState(false);
  const [sessionExists, setSessionExists] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authsuccess && usersuccess) {
      //if auth & user data loaded and session exists
      if (auth.sessionExists) {
        setSessionExists(true);
        const { authenticatedUser } = auth;
        const { watchlist } = user.find(
          ({ id }) => id === auth.authenticatedUser
        );
        dispatch(
          authSliceActions.setAuthdata({
            sessionExists: true,
            authenticatedUser,
          })
        );
        dispatch(authSliceActions.setWatchlist(watchlist));
      }
      //if auth & user data loaded and session doesn't exist
      else setSessionExists(false);
      //after session validation & data initialization(if session exists)
      setSessionValidated(true);
    }
  }, [authsuccess, usersuccess, auth]);

  if (authloading || userloading) return <Loading />;

  if (sessionValidated && !sessionExists) return <Navigate to="../login" />;

  if (sessionValidated && sessionExists) return props.children;
};

export default Validation;
