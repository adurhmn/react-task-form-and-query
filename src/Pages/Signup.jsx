//Third party imports
import { Stack, TextField, Typography, Button, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AutorenewIcon from "@mui/icons-material/Autorenew";

//Local imports
import { useGetUserdata, usePostUserdata } from "../hooks/queryHooks";

//changes format of register's return object
const getMuiRegistration = (regObj) => {
  regObj = { ...regObj };
  regObj.inputRef = regObj.ref;
  delete regObj.ref;
  return regObj;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    getValues,
    trigger,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      age: "",
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const { data: userdata } = useGetUserdata();
  const { mutate: postUserdata, status } = usePostUserdata();
  const [usernames, setUsernames] = useState([]); //to hold existing usernames

  const submitHandler = useCallback(
    (data, e) => {
      e.preventDefault();
      postUserdata(data);
    },
    [postUserdata]
  );

  //extracting all existing usernames from userdata
  useEffect(() => {
    setUsernames(userdata?.map(({ id }) => id));
  }, [userdata]);

  //resetting form after signup successfull
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful]);

  return (
    <Stack alignItems="center" sx={{ pt: "200px", textAlign: "center" }}>
      <Grid
        container
        spacing={3}
        sx={{
          width: "700px",
        }}
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Signup
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Firstname"
            type="text"
            helperText={errors.firstname?.message}
            fullWidth
            {...getMuiRegistration(
              register("firstname", {
                required: "Firstname is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabetic characters are allowed.",
                },
                maxLength: {
                  value: 80,
                  message: "Value should not exceed 80 characters.",
                },
              })
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Lastname"
            type="text"
            helperText={errors.lastname?.message}
            fullWidth
            {...getMuiRegistration(
              register("lastname", {
                required: "Lastname is required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabetic characters are allowed.",
                },
                maxLength: {
                  value: 80,
                  message: "Value should not exceed 80 characters.",
                },
              })
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Age"
            type="number"
            helperText={errors.age?.message}
            fullWidth
            {...getMuiRegistration(
              register("age", {
                required: "Age is required",
                validate: (v) =>
                  (v >= 12 && v <= 120) || "Age must be within 12 and 120",
                valueAsNumber: true,
              })
            )}
          />
        </Grid>
        <Grid item xs={4.5}>
          <TextField
            label="Username"
            type="text"
            helperText={errors.username?.message}
            fullWidth
            {...getMuiRegistration(
              register("username", {
                required: "Username is required",
                validate: {
                  checkavailable: (v) =>
                    !usernames.includes(v) || "Username already taken.",
                },
              })
            )}
          />
        </Grid>
        <Grid item xs={4.5}>
          <TextField
            label="Email"
            type="email"
            helperText={errors.email?.message}
            fullWidth
            {...getMuiRegistration(
              register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please provide proper email.",
                },
              })
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Password"
            type="password"
            helperText={errors.password?.message}
            fullWidth
            {...getMuiRegistration(
              register("password", {
                required: "Password is required",
                onChange: () => isSubmitted && trigger("cpassword"),
              })
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Confirm Password"
            type="password"
            helperText={errors.cpassword?.message}
            fullWidth
            {...getMuiRegistration(
              register("cpassword", {
                required: "Confirm Password is required",
                validate: (v) =>
                  getValues("password") === v || "Passwords don't match!",
              })
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            size="large"
            fullWidth
            disabled={status === "success"}
          >
            {status === "loading" ? (
              <AutorenewIcon />
            ) : status === "success" ? (
              "Signup Successfull!"
            ) : (
              "Signup"
            )}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography color="primary" variant="subtitle2">
            Already signed up? <Link to="/login">Login!</Link>
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Signup;
