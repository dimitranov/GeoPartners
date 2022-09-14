import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuth } from "../auth/auth";
import AppHelmet from "../components/AppHelmet";
import { AuthService } from "../services/authService";
import {
  IRegistrationCredentials,
  IUserAuthData,
  UserRoles,
} from "../types/authTypes";

export default function Registration() {
  const auth = useAuth();
  const history = useHistory();
  const [error, setError] = useState<any>(false);
  const { handleSubmit, register } = useForm({
    mode: "onChange",
  });

  const handleFormSubmit = (data: any) => {
    const registrationData: IRegistrationCredentials = {
      email: data.email,
      password: data.password,
      name: data.firstName + " " + data.lastName,
      role: UserRoles.USER,
      passwordConfirm: data.password,
    };

    AuthService.register(registrationData).then((newUser) => {
      auth
        .signin(newUser.data as IUserAuthData)
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          setError(err.response);
        });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <AppHelmet title="Wakaroo - Registration" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                {...register("firstName")}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                {...register("lastName")}
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                {...register("password")}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    {...register("rememberMe")}
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error && <Alert severity="error">{error.data.message}</Alert>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
