import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <Head title="Dashboard" />

      <div>You're logged in!</div>
    </DashboardLayout>
  );
}
