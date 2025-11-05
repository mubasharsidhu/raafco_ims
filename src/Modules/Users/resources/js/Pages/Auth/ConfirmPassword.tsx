import { Head, useForm } from "@inertiajs/react";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import AppLayout from "@/Layouts/AppLayout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("password.confirm"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <AppLayout maxWidth="xs">
      <Head title="Confirm Password" />

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
        <Typography variant="h6" textAlign="center" fontWeight={600}>
          Confirm Password
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          This is a secure area. Please confirm your password before continuing.
        </Typography>

        <TextField
          type="password"
          fullWidth
          label="Password"
          value={data.password}
          disabled={processing}
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={processing}
          sx={{ mt: 1 }}
        >
          {processing ? <CircularProgress size={18} /> : "Confirm"}
        </Button>
      </Box>
    </AppLayout>
  );
}
