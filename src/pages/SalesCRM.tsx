import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  value: number;
}

const SalesCRM = () => {
  const { hasPermission } = useAuthStore();
  const [leads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      company: "Tech Corp",
      email: "john@techcorp.com",
      phone: "(555) 123-4567",
      status: "new",
      value: 25000,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "Digital Solutions",
      email: "sarah@digitalsolutions.com",
      phone: "(555) 234-5678",
      status: "contacted",
      value: 50000,
    },
  ]);

  if (!hasPermission("sales")) {
    return <div>Access denied</div>;
  }

  const statusColors = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    qualified: "bg-green-100 text-green-800",
    proposal: "bg-purple-100 text-purple-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sales CRM</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your sales pipeline and track leads
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add new lead
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
        <div className="border-b border-gray-200 p-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="relative flex-grow">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search leads..."
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Lead
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Value
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-gray-500">{lead.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status.charAt(0).toUpperCase() +
                        lead.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-gray-900">
                    ${lead.value.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Mail className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Calendar className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesCRM;
