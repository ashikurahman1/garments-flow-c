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
    <div className="p-6 lg:m-6">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h2 className="text-3xl font-display font-bold mb-6 text-foreground">All Orders</h2>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full md:w-auto relative">
             <input
              type="text"
              placeholder="Search by buyer email, product, or tracking ID"
              className="w-full bg-background/50 border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition-all"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
               onClick={() => refetch()}
               className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-xl"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap items-center gap-2 bg-muted/30 p-1.5 rounded-xl w-fit">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === status 
                ? 'bg-background shadow-sm text-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="p-4">SL</th>
                <th className="p-4">Tracking ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Product</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card/30">
              {orders.map((order, i) => (
                <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-muted-foreground">{i + 1}</td>
                  <td className="p-4 font-mono text-xs">{order.trackingId}</td>
                  <td className="p-4 text-sm font-medium">{order.buyerEmail}</td>
                  <td className="p-4 text-sm">
                    {order.productName || (
                      <div className="space-y-1">
                        {order.products?.map(p => (
                          <div key={p._id} className="text-xs">
                            {p.name} <span className="text-muted-foreground">(x{p.quantity})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-sm font-mono">
                    {order.products
                      ? order.products.reduce((sum, p) => sum + p.quantity, 0)
                      : order.quantity}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                       (order.statusHistory?.slice(-1)[0]?.status || 'Pending') === 'Approved' ? 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900' :
                       (order.statusHistory?.slice(-1)[0]?.status || 'Pending') === 'Rejected' ? 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900' :
                       'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900'
                    }`}>
                        {order.statusHistory?.slice(-1)[0]?.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="h-8 px-3 text-xs bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 border border-secondary/20 shadow-none">
                          <IconEye size={14} className="mr-1" /> View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl glass-card border-white/20">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-display">Order Details</DialogTitle>
                          <p className="text-sm text-muted-foreground font-mono mt-1">ID: {order._id}</p>
                        </DialogHeader>
                        <DialogDescription className="space-y-4 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                                  <span className="text-xs text-muted-foreground uppercase">Buyer</span>
                                  <p className="font-medium text-foreground">{order.buyerEmail}</p>
                              </div>
                              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                                  <span className="text-xs text-muted-foreground uppercase">Current Status</span>
                                  <p className="font-medium text-foreground">{order.statusHistory?.slice(-1)[0]?.status || 'Pending'}</p>
                              </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg border border-border">
                            <h4 className="font-bold text-foreground mb-2 text-sm uppercase">Products</h4>
                             <div className="space-y-2">
                                {order.products?.map(p => (
                                    <div key={p._id} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                                    <span className="text-foreground">{p.name}</span>
                                    <span className="font-mono text-muted-foreground">Qty: {p.quantity}</span>
                                    </div>
                                ))}
                             </div>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg border border-border">
                            <h4 className="font-bold text-foreground mb-2 text-sm uppercase">Tracking History</h4>
                            <div className="space-y-3 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border pl-4">
                                {order.statusHistory?.map((t, idx) => (
                                    <div key={idx} className="relative text-sm">
                                        <div className="absolute -left-[15px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"></div>
                                        <div className="flex justify-between">
                                            <span className="font-medium text-foreground">{t.status}</span>
                                            <span className="text-xs text-muted-foreground">{new Date(t.date).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                          </div>
                        </DialogDescription>
                        <DialogClose asChild>
                          <Button className="mt-2 w-full bg-muted hover:bg-muted/80 text-foreground">Close</Button>
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
    </div>
  );
};

export default AllOrders;
