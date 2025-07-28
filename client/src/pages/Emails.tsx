import { MainLayout } from "../components/Layout/MainLayout";
import { DataTable } from "../components/ui/DataTable";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Email } from "../../../shared/schema";

const emailColumns = [
  {
    key: "subject",
    label: "Subject",
    sortable: true,
    render: (value: string) => (
      <div className="font-medium text-foreground max-w-xs truncate">{value}</div>
    ),
  },
  {
    key: "fromEmail",
    label: "From",
    render: (value: string) => (
      <div className="text-muted-foreground">{value}</div>
    ),
  },
  {
    key: "toEmail",
    label: "To",
    render: (value: string) => (
      <div className="text-muted-foreground">{value}</div>
    ),
  },
  {
    key: "body",
    label: "Preview",
    render: (value: string) => (
      <div className="max-w-md truncate text-muted-foreground text-sm">
        {value || "No content"}
      </div>
    ),
  },
  {
    key: "sentAt",
    label: "Sent",
    sortable: true,
    render: (value: string) =>
      value ? new Date(value).toLocaleString() : "-",
  },
];

export function Emails() {
  const { data: emails = [], isLoading } = useQuery({
    queryKey: ["/api/emails"],
    queryFn: api.emails.list,
  });

  return (
    <MainLayout 
      title="Email Communications" 
      subtitle="Manage and track email communications with contacts"
    >
      <div className="p-6">
        <DataTable
          title="Email History"
          columns={emailColumns}
          data={emails}
          isLoading={isLoading}
          emptyMessage="No emails found. Start communicating with your contacts."
          searchPlaceholder="Search emails..."
        />
      </div>
    </MainLayout>
  );
}
