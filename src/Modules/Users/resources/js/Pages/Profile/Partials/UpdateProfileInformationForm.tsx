import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { router, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformationForm({
  mustVerifyEmail,
  status,
}: Readonly<{ mustVerifyEmail: boolean; status?: string }>) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route("profile.update"));
  };

  return (
    <Box component="section">
      <Typography variant="h6" fontWeight={600}>
        Profile Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Update your account’s profile information and email address.
      </Typography>

      <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Name"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          autoComplete="name"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="email"
          label="Email"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          autoComplete="username"
          error={!!errors.email}
          helperText={errors.email}
        />

        {mustVerifyEmail && user.email_verified_at === null && (
          <Box mt={2}>
            <Typography variant="body2" color="warning.main">
              Your email address is unverified.
            </Typography>

            <Button
              variant="text"
              size="small"
              onClick={() => router.post(route("verification.send"))}
            >
              Resend verification email
            </Button>

            {status === "verification-link-sent" && (
              <Alert severity="success" sx={{ mt: 1 }}>
                A new verification link has been sent!
              </Alert>
            )}
          </Box>
        )}

        <Box mt={3} display="flex" alignItems="center" gap={2}>
          <Button type="submit" variant="contained" disabled={processing}>
            Save
          </Button>

          {recentlySuccessful && (
            <Typography variant="body2" color="success.main">
              Saved!
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
