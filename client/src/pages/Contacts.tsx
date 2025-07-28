import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Contact } from "@shared/schema";

const contactColumns = [
  {
    key: "firstName",
    label: "Full Name",
    sortable: true,
    render: (value: string, row: Contact) => (
      <div className="font-medium text-foreground">
        {`${row.firstName} ${row.lastName}`}
      </div>
    ),
  },
  {
    key: "title",
    label: "Title",
    render: (value: string) => value || "-",
  },
  {
    key: "phone",
    label: "Phone",
    render: (value: string) => value || "-",
  },
  {
    key: "email",
    label: "Email",
    render: (value: string) => (
      <div className="text-primary hover:underline cursor-pointer">
        {value || "-"}
      </div>
    ),
  },
  {
    key: "organizationId",
    label: "Organization",
    render: (value: string) => value || "No Organization",
  },
  {
    key: "createdAt",
    label: "Created",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleDateString() : "-",
  },
];

export function Contacts() {
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["/api/contacts"],
    queryFn: api.contacts.list,
  });

  return (
    <MainLayout 
      title="All Contacts" 
      subtitle="Manage your contact database and customer relationships"
    >
      <div className="p-6">
        <DataTable
          title="Contact Directory"
          columns={contactColumns}
          data={contacts}
          isLoading={isLoading}
          emptyMessage="No contacts found. Add your first contact to get started."
          searchPlaceholder="Search contacts..."
        />
      </div>
    </MainLayout>
  );
}
