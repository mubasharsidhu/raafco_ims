import { Head, useForm, Link as InertiaLink } from "@inertiajs/react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Link as MUILink,
} from "@mui/material";
import AppLayout from "@/Layouts/AppLayout";

interface Props {
  status?: string;
}

export default function VerifyEmail({ status }: Readonly<Props>) {
  const { post, processing } = useForm({});

  const resend = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("verification.send"));
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Verify Email" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 4,
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Verify Your Email
        </Typography>

        <Typography variant="body2" textAlign="center">
          Thanks for signing up! Before getting started, please verify your
          email by clicking the link we sent you.
        </Typography>

        {status === "verification-link-sent" && (
          <Alert severity="success">
            A new verification link has been sent to your email address.
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={processing}
          onClick={resend}
        >
          {processing && <CircularProgress size={18} />}
          Resend Verification Email
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <MUILink
            component={InertiaLink}
            href={route("logout")}
            method="post"
            underline="hover"
            sx={{ textAlign: "center" }}
          >
            Logout
          </MUILink>
        </Box>
      </Box>
    </AppLayout>
  );
}
