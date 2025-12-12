import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { IconEye } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const AllOrders = () => {
  usePageTitle('All Orders');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allOrders', user?.email, filter, searchText],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter !== 'All') params.append('status', filter.toLowerCase());
      if (searchText) params.append('searchText', searchText);

      const res = await axiosSecure.get(`/orders?${params.toString()}`);
      return res.data.orders;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white dark:bg-white/10 p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>

      {/* Search Input */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by buyer email, product, or tracking ID"
          className="border p-2 rounded w-full md:w-1/3"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button
          onClick={() => refetch()}
          className="bg-amber-800 text-white dark:text-black hover:opacity-90"
        >
          Search
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            className="bg-amber-800 hover:opacity-90 text-white"
            onClick={() => setFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className=" bg-amber-900 ">
            <tr className="text-left p-2">
              <th className="p-2">SL </th>
              <th>Tracking ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order.trackingId}</td>
                <td>{order.buyerEmail}</td>
                <td>
                  {order.productName || (
                    <div>
                      {order.products?.map(p => (
                        <div key={p._id}>
                          {p.name} ({p.quantity})
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td>
                  {order.products
                    ? order.products.reduce((sum, p) => sum + p.quantity, 0)
                    : order.quantity}
                </td>
                <td>
                  {order.statusHistory?.slice(-1)[0]?.status || 'Pending'}
                </td>
                <td>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-800 text-white hover:opacity-90 flex items-center gap-1">
                        <IconEye size={14} /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Order Details: {order._id}</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <p>User: {order.buyerEmail}</p>
                        <p>
                          Status:{' '}
                          {order.statusHistory?.slice(-1)[0]?.status ||
                            'Pending'}
                        </p>
                        <div className="mt-2">
                          <h4 className="font-bold">Products:</h4>
                          {order.products?.map(p => (
                            <div key={p._id} className="flex justify-between">
                              <span>{p.name}</span>
                              <span>Qty: {p.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2">
                          <h4 className="font-bold">Tracking History:</h4>
                          {order.statusHistory?.map((t, idx) => (
                            <div key={idx}>
                              {new Date(t.date).toLocaleString()}: {t.status}
                            </div>
                          ))}
                        </div>
                      </DialogDescription>
                      <DialogClose asChild>
                        <Button className="mt-4">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
