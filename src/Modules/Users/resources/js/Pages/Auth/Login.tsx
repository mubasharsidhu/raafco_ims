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
  CircularProgress,
} from "@mui/material";

import AppLayout from "@/Layouts/AppLayout";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

type FormErrors = Record<keyof LoginForm, string | undefined>;

export default function Login() {
  const { data, setData, post, processing, errors } = useForm<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });

  const formErrors: FormErrors = errors as FormErrors;

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
          type="email"
          fullWidth
          label="Email"
          value={data.email}
          disabled={processing}
          error={!!formErrors.email}
          helperText={formErrors.email}
          onChange={(e) =>
            setData((data) => ({ ...data, email: e.target.value }))
          }
        />

        <TextField
          type="password"
          fullWidth
          label="Password"
          value={data.password}
          disabled={processing}
          error={!!formErrors.password}
          helperText={formErrors.password}
          onChange={(e) =>
            setData((data) => ({ ...data, password: e.target.value }))
          }
        />

        <FormControlLabel
          label="Remember me"
          disabled={processing}
          control={
            <Checkbox
              checked={data.remember}
              onChange={(e) =>
                setData((data) => ({ ...data, remember: e.target.checked }))
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
        >
          {processing && <CircularProgress size={18} />}
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
