import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';
import Swal from 'sweetalert2';

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

  const handleCancel = async orderId => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
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

  if (isLoading) return <p className="text-center py-20">Loading orders...</p>;
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
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <div className="overflow-x-auto shadow bg-white rounded-md">
        <table className="table-auto w-full text-left">
          <thead className="bg-amber-800 text-white">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map(order => {
              const currentStatus = order.statusHistory?.length
                ? order.statusHistory[order.statusHistory.length - 1].status
                : 'pending';

              return (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        currentStatus === 'pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : currentStatus === 'cancelled'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {currentStatus.charAt(0).toUpperCase() +
                        currentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                      {String(order.paymentOption || '').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" onClick={() => setSelectedOrder(order)}>
                      View
                    </Button>
                    {currentStatus === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancel(order._id)}
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
      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="fixed inset-0 bg-black opacity-30" />

            <div className="bg-white rounded-xl p-6 w-full max-w-lg z-10 shadow-lg space-y-4">
              <DialogTitle className="text-2xl font-bold mb-2">
                {selectedOrder.productName}
              </DialogTitle>

              <p>
                <strong>Quantity:</strong> {selectedOrder.quantity}
              </p>
              <p>
                <strong>Payment:</strong>{' '}
                {String(selectedOrder.paymentOption || '').toUpperCase()}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {selectedOrder.statusHistory?.length
                  ? selectedOrder.statusHistory[
                      selectedOrder.statusHistory.length - 1
                    ].status
                  : 'pending'}
              </p>
              <p>
                <strong>Delivery Address:</strong>{' '}
                {selectedOrder.deliveryAddress}
              </p>
              {selectedOrder.additionalNotes && (
                <p>
                  <strong>Notes:</strong> {selectedOrder.additionalNotes}
                </p>
              )}

              {/* Tracking Timeline */}
              <div>
                <h3 className="font-semibold mb-2">Tracking</h3>
                <ul className="space-y-2">
                  {selectedOrder.statusHistory?.map((step, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          step.date ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      />
                      <span
                        className={
                          step.date ? 'font-semibold' : 'text-gray-400'
                        }
                      >
                        {step.status.charAt(0).toUpperCase() +
                          step.status.slice(1)}
                      </span>
                      {step.date && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({new Date(step.date).toLocaleDateString()})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setSelectedOrder(null)}>Close</Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default MyOrdersPage;
