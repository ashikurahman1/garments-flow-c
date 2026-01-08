import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router';

const MyOrdersPage = () => {
  const axiosSecure = useAxiosSecure();
  usePageTitle('My Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orders/my-orders');
      return res.data.orders;
    },
  });
  console.log(data);

  const handleCancel = async orderId => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/orders/${orderId}`);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Order cancelled successfully!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        refetch();
      } catch (err) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Failed to cancel the order.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center py-20 text-red-600">Failed to load orders.</p>
    );

  const statusSteps = [
    'pending',
    'approved',
    'processing',
    'shipped',
    'delivered',
  ];

  return (
    <div className="p-6 lg:m-6">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h1 className="text-2xl font-display font-bold mb-6 text-foreground">My Orders</h1>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Order ID</th>
                <th className="p-4 font-semibold text-foreground">Tracking ID</th>
                <th className="p-4 font-semibold text-foreground">Product</th>
                <th className="p-4 font-semibold text-foreground">Quantity</th>
                <th className="p-4 font-semibold text-foreground">Status</th>
                <th className="p-4 font-semibold text-foreground">Payment</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-card/30">
              {data.map(order => {
                const currentStatus = order.statusHistory?.length
                  ? order.statusHistory[order.statusHistory.length - 1].status
                  : 'pending';

                return (
                  <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-xs font-mono text-muted-foreground">{order._id.slice(-6)}</td>
                    <td className="p-4 text-xs font-mono text-primary">{order.trackingId}</td>
                    <td className="p-4 font-medium text-foreground">{order.productName}</td>
                    <td className="p-4 font-mono text-muted-foreground">{order.quantity}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          currentStatus === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900/50'
                            : currentStatus === 'cancelled'
                            ? 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50'
                            : 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900/50'
                        }`}
                      >
                        {currentStatus.charAt(0).toUpperCase() +
                          currentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-500/10 text-green-600'
                            : order.paymentOption === 'payfirst'
                            ? 'bg-primary/10 text-primary'
                            : order.paymentOption === 'cod'
                            ? 'bg-blue-500/10 text-blue-600'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {order.paymentStatus === 'paid' ? (
                          'Paid'
                        ) : order.paymentOption === 'payfirst' ? (
                          <Link to={`/payment?trackingId=${order.trackingId}`} className="hover:underline">
                            Pay Now
                          </Link>
                        ) : (
                          order.paymentOption === 'cod' && 'COD'
                        )}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="hover:bg-muted text-muted-foreground"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </Button>
                      {currentStatus === 'pending' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancel(order._id)}
                          className="shadow-sm"
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Dialog
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="glass-card w-full max-w-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <DialogTitle className="text-xl font-bold mb-4 font-display text-foreground border-b border-border pb-2">
                  {selectedOrder?.productName}
                </DialogTitle>

                {selectedOrder && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <span className="text-xs text-muted-foreground uppercase">Quantity</span>
                                <p className="font-mono text-sm text-foreground">{selectedOrder.quantity}</p>
                             </div>
                             <div>
                                <span className="text-xs text-muted-foreground uppercase">Payment</span>
                                <p className="font-medium text-sm text-foreground">{String(selectedOrder.paymentOption || '').toUpperCase()}</p>
                             </div>
                        </div>

                        <div className="bg-muted/30 p-3 rounded-lg border border-border">
                            <span className="text-xs text-muted-foreground uppercase">Status</span>
                             <p className="font-medium text-foreground">
                                {selectedOrder.statusHistory?.length
                                ? selectedOrder.statusHistory[
                                    selectedOrder.statusHistory.length - 1
                                    ].status
                                : 'pending'}
                             </p>
                        </div>

                        <div className="bg-muted/30 p-3 rounded-lg border border-border">
                             <span className="text-xs text-muted-foreground uppercase">Delivery Address</span>
                             <p className="text-sm text-foreground">{selectedOrder.deliveryAddress}</p>
                        </div>

                        {selectedOrder.additionalNotes && (
                             <div className="text-sm text-muted-foreground italic">
                                "{selectedOrder.additionalNotes}"
                             </div>
                        )}

                        {/* Tracking Timeline */}
                        <div className="pt-2">
                            <h3 className="font-bold text-sm text-foreground mb-3 uppercase">Tracking</h3>
                            
                             <div className="relative border-l-2 border-border ml-2 pl-4 space-y-4">
                                {selectedOrder.statusHistory?.map((step, idx) => (
                                    <div key={idx} className="relative">
                                        <div
                                            className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-background ${
                                            step.date ? 'bg-primary' : 'bg-muted'
                                            }`}
                                        />
                                        <div className="flex flex-col">
                                            <span
                                                className={`text-sm font-medium ${
                                                step.date ? 'text-foreground' : 'text-muted-foreground'
                                                }`}
                                            >
                                                {step.status.charAt(0).toUpperCase() +
                                                step.status.slice(1)}
                                            </span>
                                            {step.date && (
                                                <span className="text-xs text-muted-foreground">
                                                {new Date(step.date).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button onClick={() => setSelectedOrder(null)} variant="outline">Close</Button>
                        </div>
                    </div>
                )}
              </DialogPanel>
            </div>
        </Dialog>
      </div>
    </div>
  );
};

export default MyOrdersPage;
