import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import usePageTitle from '../../../../hooks/usePageTitle';
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
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const PendingOrders = () => {
  usePageTitle('Pending Orders');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['pending-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orders/pending');
      return res.data;
    },
  });

  const orders = Array.isArray(data) ? data : [];

  const handleApprove = async id => {
    await axiosSecure.patch(`/orders/${id}/approve`);
    queryClient.invalidateQueries(['pending-orders']);
  };

  const handleReject = async id => {
    await axiosSecure.patch(`/orders/${id}/reject`);
    queryClient.invalidateQueries(['pending-orders']);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-white dark:bg-white/10 p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Pending Orders</h2>

      <div className="overflow-x-auto shadow   rounded-md">
        <table className="table-auto w-full text-left">
          <thead className="   bg-amber-800 text-white">
            <tr>
              <th className="p-2">Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border">
                <td className="p-2">{order._id}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2 p-2">
                  <Button
                    className="bg-green-600 text-white  "
                    onClick={() => handleApprove(order._id)}
                  >
                    Approve
                  </Button>

                  <Button
                    className="bg-red-600 text-white "
                    onClick={() => handleReject(order._id)}
                  >
                    Reject
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setSelected(order)}
                        className="bg-amber-700 text-white  "
                      >
                        <IconEye size={16} />
                      </Button>
                    </DialogTrigger>

                    {selected && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                        </DialogHeader>

                        <DialogDescription>
                          <p>Order ID: {selected._id}</p>
                          <p>Buyer: {selected.buyerEmail}</p>
                          <p>Product: {selected.productName}</p>
                          <p>Quantity: {selected.quantity}</p>

                          <h4 className="font-bold mt-3">Status History</h4>
                          {selected.statusHistory?.map((s, idx) => (
                            <div key={idx}>
                              {s.status} — {new Date(s.date).toLocaleString()}
                            </div>
                          ))}
                        </DialogDescription>

                        <DialogClose asChild>
                          <Button className="mt-4">Close</Button>
                        </DialogClose>
                      </DialogContent>
                    )}
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

export default PendingOrders;
