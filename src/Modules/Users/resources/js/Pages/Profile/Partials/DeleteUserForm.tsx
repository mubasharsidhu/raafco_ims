import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";

export default function DeleteUserForm() {
  const [open, setOpen] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const {
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({ password: "" });

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
      onFinish: () => reset(),
      onError: () => passwordInput.current?.focus(),
    });
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Once your account is deleted, all of its data will be permanently
        removed.
      </Typography>

      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        Delete Account
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please enter your password to confirm deletion.
          </Typography>

          <TextField
            type="password"
            fullWidth
            autoFocus
            label="Password"
            inputRef={passwordInput}
            error={!!errors.password}
            helperText={errors.password}
            onChange={(e) => setData("password", e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={processing}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
