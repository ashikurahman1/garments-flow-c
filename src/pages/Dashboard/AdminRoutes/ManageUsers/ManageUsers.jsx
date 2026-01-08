import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconEdit, IconTrash, IconSearch, IconFilter, IconUserOff, IconUserCheck } from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [suspendData, setSuspendData] = useState({ reason: '', feedback: '' });

  // Search & Filter state
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Fetch users with search & filters
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', searchText, filterRole, filterStatus],
    queryFn: async () => {
      let url = '/users?';
      if (searchText) url += `searchText=${encodeURIComponent(searchText)}&`;
      if (filterRole) url += `role=${encodeURIComponent(filterRole)}&`;
      if (filterStatus) url += `status=${encodeURIComponent(filterStatus)}&`;

      const res = await axiosSecure.get(url);
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
      confirmButtonColor: '#ef4444',
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">Manage Users</h2>
            <p className="text-muted-foreground mt-1 text-sm">View and manage system users, roles, and status.</p>
          </div>
      </div>

      <div className="glass-card p-4 space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                type="text"
                placeholder="Search users..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-background/50 border border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
            </div>
            
            <div className="flex gap-4">
                <div className="relative">
                     <IconFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <select
                        value={filterRole}
                        onChange={e => setFilterRole(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-lg bg-background/50 border border-border focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                    >
                        <option value="">All Roles</option>
                        <option value="buyer">Buyer</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div className="relative">
                    <IconUserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-lg bg-background/50 border border-border focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer"
                    >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-border bg-card/50">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold tracking-wider border-b border-border">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{user.displayName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${
                            user.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/50' 
                            : user.role === 'manager' 
                            ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900/50' 
                            : 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50'
                        }`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize flex w-fit items-center gap-1 border ${
                             user.status === 'active' 
                             ? 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900/50' 
                             : 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50'
                        }`}>
                             {user.status === 'active' ? <IconUserCheck size={12}/> : <IconUserOff size={12} />}
                             {user.status || 'Active'}
                        </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleOpenModal(user)}
                        className="hover:bg-primary/10 hover:text-primary transition-colors h-8 w-8 p-0 rounded-full"
                        title="Edit User"
                      >
                        <IconEdit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(user)}
                        className="hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors h-8 w-8 p-0 rounded-full"
                         title="Delete User"
                      >
                        <IconTrash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                    <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                            No users found matching your filters.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>

      {/* Modal - Customized for Premium Feel */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
             <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">X</button>
            <h3 className="text-xl font-bold mb-1 font-display">
              Update User
            </h3>
            <p className="text-sm text-muted-foreground mb-6">Modify permissions for {selectedUser.displayName}</p>

            <div className="space-y-4">
                <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <select
                    value={selectedUser.role}
                    onChange={handleRoleChange}
                    className="w-full border border-border bg-background p-2.5 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                    <option value="buyer">Buyer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                </div>

                <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select
                    value={selectedUser.status}
                    onChange={handleStatusChange}
                    className="w-full border border-border bg-background p-2.5 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                </select>
                </div>

                {selectedUser.status === 'suspended' && (
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <form onSubmit={handleSuspend} className="space-y-3">
                        <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Reason</label>
                        <input
                            type="text"
                            placeholder="Why suspend?"
                            value={suspendData.reason}
                            onChange={e =>
                            setSuspendData({ ...suspendData, reason: e.target.value })
                            }
                            className="w-full border border-border bg-background p-2 rounded text-sm mt-1"
                        />
                        </div>
                        <div>
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Feedback</label>
                        <input
                            type="text"
                             placeholder="Note for user/admin"
                            value={suspendData.feedback}
                            onChange={e =>
                            setSuspendData({
                                ...suspendData,
                                feedback: e.target.value,
                            })
                            }
                            className="w-full border border-border bg-background p-2 rounded text-sm mt-1"
                        />
                        </div>
                        <Button type="submit" size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Confirm Suspension
                        </Button>
                    </form>
                </div>
                )}
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="hover:bg-muted"
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ManageUsers;
