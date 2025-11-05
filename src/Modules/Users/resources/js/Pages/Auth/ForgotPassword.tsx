import { Head, useForm } from "@inertiajs/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import AppLayout from "@/Layouts/AppLayout";

interface ForgotForm {
  email: string;
}

type FormErrors = Record<keyof ForgotForm, string | undefined>;

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm<ForgotForm>({
    email: "",
  });

  const formErrors: FormErrors = errors as FormErrors;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.email"));
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Forgot Password" />

      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 4,
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Forgot Password
        </Typography>

        <Typography variant="body2" textAlign="center">
          Enter your email and we'll send you reset instructions.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={data.email}
          error={!!formErrors.email}
          helperText={formErrors.email}
          disabled={processing}
          onChange={(e) =>
            setData((data) => ({ ...data, email: e.target.value }))
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={processing}
          fullWidth
          sx={{ mt: 1 }}
        >
          {processing && <CircularProgress size={18} />}
          Send Reset Link
        </Button>

        <Link href={route("login")} underline="hover" textAlign="center">
          Back to Login
        </Link>
      </Box>
    </AppLayout>
  );
}
