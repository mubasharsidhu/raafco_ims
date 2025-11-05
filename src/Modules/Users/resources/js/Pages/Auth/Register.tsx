import { Head, useForm } from "@inertiajs/react";
import React from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  CircularProgress,
} from "@mui/material";

import AppLayout from "@/Layouts/AppLayout";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms: boolean;
}

type RegisterFormErrors = Record<keyof RegisterForm, string | undefined>;

export default function Register() {
  const { data, setData, post, processing, errors } = useForm<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  const formErrors: RegisterFormErrors = errors as RegisterFormErrors;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("register"));
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Register" />

      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: (theme) => theme.palette.background.paper,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Create an account
        </Typography>

        <TextField
          label="Full Name"
          fullWidth
          value={data.name}
          disabled={processing}
          error={!!formErrors.name}
          helperText={formErrors.name}
          onChange={(e) =>
            setData((data) => ({ ...data, name: e.target.value }))
          }
        />

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

        <TextField
          type="password"
          fullWidth
          label="Confirm Password"
          value={data.password_confirmation}
          disabled={processing}
          error={!!formErrors.password_confirmation}
          helperText={formErrors.password_confirmation}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              password_confirmation: e.target.value,
            }))
          }
        />

        <FormControlLabel
          label="I agree to the Terms & Privacy Policy"
          disabled={processing}
          control={
            <Checkbox
              checked={data.terms}
              onChange={(e) =>
                setData((data) => ({ ...data, terms: e.target.checked }))
              }
            />
          }
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={processing}
          sx={{ mt: 1 }}
        >
          {processing && <CircularProgress size={18} />}
          Create Account
        </Button>

        <Typography textAlign="center">
          Already have an account?{" "}
          <Link href={route("login")} underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </AppLayout>
  );
}
