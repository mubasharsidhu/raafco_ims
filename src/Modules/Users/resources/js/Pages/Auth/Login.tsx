import { Head, useForm } from "@inertiajs/react";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import AppLayout from "@/Layouts/AppLayout";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

type LoginFormErrors = Record<keyof LoginForm, string | undefined>;

export default function Login() {
  const { data, setData, post, processing, errors } = useForm<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const formErrors: LoginFormErrors = errors as LoginFormErrors;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("login"));
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Login" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: (theme) => theme.palette.background.paper,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
        component="form"
        onSubmit={submit}
      >
        <Typography variant="h5" textAlign="center">
          Sign in to your account
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          value={data.email}
          onChange={(e) =>
            setData((data) => ({ ...data, email: e.target.value }))
          }
          error={!!formErrors.email}
          helperText={formErrors.email}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={data.password}
          onChange={(e) =>
            setData((data) => ({ ...data, password: e.target.value }))
          }
          error={!!formErrors.password}
          helperText={formErrors.password}
        />

        <FormControlLabel
          label="Remember me"
          control={
            <Checkbox
              checked={data.remember}
              onChange={(e) =>
                setData((data) => ({
                  ...data,
                  remember: (e.target.checked || false) as false,
                }))
              }
            />
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={processing}
          sx={{ mt: 1 }}
        >
          Sign In
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Link href={route("password.request")} underline="hover">
            Forgot password?
          </Link>
          <Link href={route("register")} underline="hover">
            Register
          </Link>
        </Box>
      </Box>
    </AppLayout>
  );
}
