import DashboardLayout from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Paper, Stack } from "@mui/material";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
  mustVerifyEmail,
  status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
  return (
    <DashboardLayout title="Profile">
      <Head title="Profile" />

      <Stack spacing={3} maxWidth="800px" mx="auto">
        {/* Profile Info */}
        <Paper sx={{ p: 3 }}>
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
          />
        </Paper>

        {/* Password */}
        <Paper sx={{ p: 3 }}>
          <UpdatePasswordForm />
        </Paper>

        {/* Delete */}
        <Paper sx={{ p: 3 }}>
          <DeleteUserForm />
        </Paper>
      </Stack>
    </DashboardLayout>
  );
}
