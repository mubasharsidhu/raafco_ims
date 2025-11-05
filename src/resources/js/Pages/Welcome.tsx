import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Container, Typography, Button, Stack, Paper } from "@mui/material";

export default function Welcome({ auth }: PageProps) {
  return (
    <>
      <Head title="Welcome" />

      <Container
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            textAlign: "center",
            p: 6,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome to Raafco IMS
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={4}>
            Streamline your organization’s inventory and operations.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            {auth?.user ? (
              <Button
                component={Link}
                href={route("dashboard")}
                variant="contained"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  component={Link}
                  href={route("login")}
                  variant="contained"
                >
                  Log in
                </Button>
                <Button
                  component={Link}
                  href={route("register")}
                  variant="outlined"
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
