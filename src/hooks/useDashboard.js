import { useQuery } from '@tanstack/react-query';
import useRole from './useRole';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useRole();

  // Admin metrics
  const { data: adminStats = {}, isLoading: adminLoading } = useQuery({
    queryKey: ['admin-stats'],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/admin/stats');
      return res.data;
    },
  });

  // Manager metrics
  const { data: managerStats = {}, isLoading: managerLoading } = useQuery({
    queryKey: ['manager-stats', user?.email],
    enabled: role === 'manager' && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/manager/stats?email=${user.email}`
      );
      return res.data;
    },
  });

  // Buyer metrics
  const { data: buyerStats = {}, isLoading: buyerLoading } = useQuery({
    queryKey: ['buyer-stats', user?.email],
    enabled: role === 'buyer' && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/buyer/stats?email=${user.email}`
      );
      return res.data;
    },
  });

  return {
    role,
    roleLoading,
    adminStats,
    adminLoading,
    managerStats,
    managerLoading,
    buyerStats,
    buyerLoading,
  };
};

export default useDashboard;
