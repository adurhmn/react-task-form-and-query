//Third party imports
import { Stack, TextField, Typography, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

//Local imports
import {
  useGetUserdata,
  useGetAuthData,
  usePostAuthData,
} from "../hooks/queryHooks";
import Loading from "../Utils/Loading";

//changes format of register's return object
const getMuiRegistration = (regObj) => {
  regObj = { ...regObj };
  regObj.inputRef = regObj.ref;
  delete regObj.ref;
  return regObj;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //query handlers
  const { data: authdata, isLoading: authloading } = useGetAuthData();
  const { data: userdata, isLoading: userloading } = useGetUserdata();
  const { mutate: postAuthdata } = usePostAuthData();
  const queryClient = useQueryClient();

  const handleLogin = useCallback((authenticatedUser) => {
    postAuthdata({ sessionExists: true, authenticatedUser });
    //below code saves additional http request
    queryClient.setQueryData(useGetAuthData.queryKey, {
      sessionExists: true,
      authenticatedUser,
    });
  }, []);

  const submitHandler = useCallback(
    ({ username, password }, e) => {
      e.preventDefault();
      //finding userdata if exists
      const user = userdata.find(({ id }) => id === username);

      //creds validation
      if (!user || user.password !== password)
        //if validation fails
        setError("wrongCreds", {
          type: "wrongCreds",
          message: "Invalid username/password",
        });
      //if validation success
      else handleLogin(username);
    },
    [handleLogin, userdata]
  );

  if (authloading || userloading) return <Loading />;

  //checking if session exists in authdata
  //if no session exists, display login. else go to dashboard
  if (authdata?.sessionExists) return <Navigate to="/dashboard" />;

  return (
    <Stack alignItems="center" sx={{ pt: "200px", textAlign: "center" }}>
      <Stack
        spacing={3}
        sx={{
          width: "700px",
        }}
        component="form"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>

        <TextField
          label="Username"
          type="text"
          helperText={errors.username?.message}
          fullWidth
          {...getMuiRegistration(
            register("username", {
              required: "Username required",
              onChange: () => clearErrors("wrongCreds"),
            })
          )}
        />

        <TextField
          label="Password"
          type="password"
          helperText={errors.password?.message}
          fullWidth
          {...getMuiRegistration(
            register("password", {
              required: "Password required",
              onChange: () => clearErrors("wrongCreds"),
            })
          )}
        />

        {errors.wrongCreds ? (
          <Typography color="error.light">
            {errors.wrongCreds?.message}
          </Typography>
        ) : null}

        <Button variant="contained" type="submit" size="large">
          Login
        </Button>

        <Typography color="primary" variant="subtitle2">
          Haven't signed yet? <Link to="/signup">Signup!</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Login;
