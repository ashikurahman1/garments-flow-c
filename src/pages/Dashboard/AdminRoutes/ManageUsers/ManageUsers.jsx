import React from 'react';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const ManageUsers = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'buyer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'manager' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', role: 'buyer' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Manage Users</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button className="bg-amber-800 hover:opacity-90 flex items-center gap-1">
                    <IconEdit size={16} /> Update
                  </Button>
                  <Button className="bg-red-600 hover:opacity-90 flex items-center gap-1">
                    <IconTrash size={16} /> Suspend
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
