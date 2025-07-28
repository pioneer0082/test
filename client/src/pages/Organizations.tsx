import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Organization } from "../../../shared/schema";

const organizationColumns = [
  {
    key: "name",
    label: "Organization Name",
    sortable: true,
    render: (value: string) => (
      <div className="font-medium text-foreground">{value}</div>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    render: (value: string) => value || "-",
  },
  {
    key: "billingStreet",
    label: "Billing Street",
    render: (value: string) => value || "-",
  },
  {
    key: "billingCity",
    label: "Billing City",
    render: (value: string) => value || "-",
  },
  {
    key: "billingState",
    label: "Billing State",
    render: (value: string) => value || "-",
  },
  {
    key: "billingCountry",
    label: "Billing Country",
    render: (value: string) => value || "-",
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
];

export function Organizations() {
  const { data: organizations = [], isLoading } = useQuery({
    queryKey: ["/api/organizations"],
    queryFn: api.organizations.list,
  });

  return (
    <MainLayout 
      title="All Organizations" 
      subtitle="Manage your organization directory and company relationships"
    >
      <div className="p-6">
        <DataTable
          title="Organization Directory"
          columns={organizationColumns}
          data={organizations}
          isLoading={isLoading}
          emptyMessage="No organizations found. Add your first organization to get started."
          searchPlaceholder="Search organizations..."
        />
      </div>
    </MainLayout>
  );
}
