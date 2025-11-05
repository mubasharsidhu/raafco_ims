import { Head, useForm } from "@inertiajs/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import AppLayout from "@/Layouts/AppLayout";

interface ResetProps {
  token: string;
  email: string;
}

interface ResetForm {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type FormErrors = Record<keyof ResetForm, string | undefined>;

export default function ResetPassword({ token, email }: Readonly<ResetProps>) {
  const { data, setData, post, processing, errors } = useForm<ResetForm>({
    token,
    email,
    password: "",
    password_confirmation: "",
  });

  const formErrors: FormErrors = errors as FormErrors;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.store"));
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Reset Password" />

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
          Reset Password
        </Typography>

        <TextField fullWidth label="Email" value={data.email} disabled />

        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={data.password}
          error={!!formErrors.password}
          helperText={formErrors.password}
          onChange={(e) =>
            setData((data) => ({ ...data, password: e.target.value }))
          }
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={data.password_confirmation}
          error={!!formErrors.password_confirmation}
          helperText={formErrors.password_confirmation}
          onChange={(e) =>
            setData((data) => ({
              ...data,
              password_confirmation: e.target.value,
            }))
          }
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={processing}
        >
          {processing && <CircularProgress size={18} />}
          Reset Password
        </Button>

        <Link href={route("login")} underline="hover" textAlign="center">
          Back to Login
        </Link>
      </Box>
    </AppLayout>
  );
}
