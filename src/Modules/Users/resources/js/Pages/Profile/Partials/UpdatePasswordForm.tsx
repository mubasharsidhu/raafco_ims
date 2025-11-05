import { useForm } from "@inertiajs/react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useRef, useState } from "react";

export default function UpdatePasswordForm() {
  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const [showToast, setShowToast] = useState(false);

  const { data, setData, errors, put, reset, processing } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowToast(true);
      },
      onError: () => {
        passwordInput.current?.focus();
      },
    });
  };

  return (
    <Box component="form" onSubmit={updatePassword}>
      <TextField
        fullWidth
        label="Current Password"
        type="password"
        value={data.current_password}
        error={!!errors.current_password}
        helperText={errors.current_password}
        inputRef={currentPasswordInput}
        onChange={(e) => setData("current_password", e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="password"
        label="New Password"
        value={data.password}
        error={!!errors.password}
        helperText={errors.password}
        inputRef={passwordInput}
        onChange={(e) => setData("password", e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        value={data.password_confirmation}
        error={!!errors.password_confirmation}
        helperText={errors.password_confirmation}
        onChange={(e) => setData("password_confirmation", e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button type="submit" variant="contained" disabled={processing}>
        Save Password
      </Button>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
      >
        <Alert severity="success">Password updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
