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
    <div className="p-6 lg:m-6">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Pending Orders</h2>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Order ID</th>
                <th className="p-4 font-semibold text-foreground">User</th>
                <th className="p-4 font-semibold text-foreground">Product</th>
                <th className="p-4 font-semibold text-foreground">Qty</th>
                <th className="p-4 font-semibold text-foreground">Date</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-card/30">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-xs font-mono text-muted-foreground">{order._id}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{order.buyerEmail}</td>
                  <td className="p-4 text-sm text-foreground">{order.productName}</td>
                  <td className="p-4 font-mono text-sm">{order.quantity}</td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td className="p-4 flex gap-2 items-center">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="shadow-sm"
                      onClick={() => handleReject(order._id)}
                    >
                      Reject
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelected(order)}
                          variant="ghost"
                          className="hover:bg-muted text-muted-foreground"
                        >
                          <IconEye size={18} />
                        </Button>
                      </DialogTrigger>

                      {selected && (
                        <DialogContent className="glass-card border-white/20">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                          </DialogHeader>

                          <DialogDescription className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase">Order ID</span>
                                    <p className="font-mono text-sm text-foreground">{selected._id}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase">Date</span>
                                    <p className="text-sm text-foreground">{new Date(selected.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            
                            <div className="bg-muted/30 p-3 rounded-lg border border-border">
                                <span className="text-xs text-muted-foreground uppercase">Product Info</span>
                                <div className="flex justify-between mt-1">
                                    <span className="font-medium text-foreground">{selected.productName}</span>
                                    <span className="font-mono text-muted-foreground">x{selected.quantity}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Buyer: {selected.buyerEmail}</p>
                            </div>

                            <div>
                                <h4 className="font-bold text-sm mb-2 text-foreground">Status History</h4>
                                <div className="space-y-2 border-l-2 border-border pl-3 ml-1">
                                    {selected.statusHistory?.map((s, idx) => (
                                        <div key={idx} className="text-sm">
                                        <span className="font-medium text-foreground">{s.status}</span>
                                        <span className="text-xs text-muted-foreground ml-2">— {new Date(s.date).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          </DialogDescription>

                          <DialogClose asChild>
                            <Button className="mt-4 w-full" variant="outline">Close</Button>
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
    </div>
  );
};

export default PendingOrders;
