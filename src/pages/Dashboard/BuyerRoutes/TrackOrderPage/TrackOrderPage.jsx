import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const TrackOrderPage = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState(null);

  const { refetch } = useQuery({
    queryKey: ['trackOrder', trackingId],
    enabled: false, // only fetch when user submits
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/track-by-id/${trackingId}`);
      setOrder(res.data.order);
      return res.data.order;
    },
  });

  const handleTrack = async e => {
    e.preventDefault();
    if (!trackingId) return;
    refetch();
  };

  return (
    <div className="p-6 lg:m-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

      {/* Input for tracking ID */}
      <form onSubmit={handleTrack} className="flex gap-2 mb-6">
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={e => setTrackingId(e.target.value)}
        />
        <Button type="submit">Track</Button>
      </form>

      {order && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            {order.productName} ({order.trackingId})
          </h2>

          {/* Timeline */}
          <div className="space-y-4">
            {order.statusHistory?.map((step, idx) => {
              const isLatest = idx === order.statusHistory.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-4 border-l-4 ${
                    isLatest
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-300'
                  } rounded-md`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {step.status.charAt(0).toUpperCase() +
                        step.status.slice(1)}
                    </span>
                    {step.date && (
                      <span className="text-sm text-gray-500">
                        {new Date(step.date).toLocaleString()}
                      </span>
                    )}
                  </div>
                  {step.location && (
                    <p className="text-gray-600">Location: {step.location}</p>
                  )}
                  {step.notes && (
                    <p className="text-gray-600">Notes: {step.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;
