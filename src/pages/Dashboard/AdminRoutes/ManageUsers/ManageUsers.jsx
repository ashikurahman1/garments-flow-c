import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [suspendData, setSuspendData] = useState({ reason: '', feedback: '' });

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Update user role/status mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, role, status }) => {
      const res = await axiosSecure.patch(`/users/${id}`, { role, status });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  // Suspend user mutation
  const suspendUserMutation = useMutation({
    mutationFn: async ({ id, reason, feedback }) => {
      const res = await axiosSecure.patch(`/users/${id}/suspend`, {
        suspendReason: reason,
        suspendFeedback: feedback,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDelete = user => {
    Swal.fire({
      title: `Delete ${user.displayName}?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user._id, {
          onSuccess: () => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          onError: err => {
            Swal.fire(
              'Error!',
              err.response?.data?.message || 'Failed to delete user.',
              'error'
            );
          },
        });
      }
    });
  };

  const handleOpenModal = user => {
    setSelectedUser(user);
    setModalOpen(true);
    setSuspendData({ reason: '', feedback: '' });
  };

  const handleSuspend = e => {
    e.preventDefault();
    if (!suspendData.reason || !suspendData.feedback) {
      Swal.fire('Error', 'Please provide reason and feedback', 'warning');
      return;
    }
    suspendUserMutation.mutate(
      { id: selectedUser._id, ...suspendData },
      {
        onSuccess: () => {
          Swal.fire(
            'User Suspended',
            'User has been suspended successfully',
            'success'
          );
          setModalOpen(false);
        },
      }
    );
  };

  const handleRoleChange = e => {
    setSelectedUser({ ...selectedUser, role: e.target.value });
  };

  const handleStatusChange = e => {
    setSelectedUser({ ...selectedUser, status: e.target.value });
  };

  const handleUpdate = () => {
    updateUserMutation.mutate(
      {
        id: selectedUser._id,
        role: selectedUser.role,
        status: selectedUser.status,
      },
      {
        onSuccess: () => {
          Swal.fire('Updated!', 'User has been updated.', 'success');
          setModalOpen(false);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.displayName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button
                    onClick={() => handleOpenModal(user)}
                    className="bg-amber-800 flex items-center gap-1"
                  >
                    <IconEdit size={16} /> Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(user)}
                    className="bg-red-600 flex items-center gap-1"
                  >
                    <IconTrash size={16} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              Update {selectedUser.displayName}
            </h3>

            <div className="mb-4">
              <label>Role:</label>
              <select
                value={selectedUser.role}
                onChange={handleRoleChange}
                className="w-full border p-2 rounded"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4">
              <label>Status:</label>
              <select
                value={selectedUser.status}
                onChange={handleStatusChange}
                className="w-full border p-2 rounded"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {selectedUser.status === 'suspended' && (
              <form onSubmit={handleSuspend} className="mb-4">
                <div className="mb-2">
                  <label>Reason:</label>
                  <input
                    type="text"
                    value={suspendData.reason}
                    onChange={e =>
                      setSuspendData({ ...suspendData, reason: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label>Feedback:</label>
                  <input
                    type="text"
                    value={suspendData.feedback}
                    onChange={e =>
                      setSuspendData({
                        ...suspendData,
                        feedback: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <Button type="submit" className="bg-red-600 w-full mt-2">
                  Suspend User
                </Button>
              </form>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={handleUpdate} className="bg-amber-800">
                Update
              </Button>
              <Button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
