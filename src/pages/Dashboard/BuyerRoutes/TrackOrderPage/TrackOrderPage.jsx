import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const TrackOrderPage = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState('');

  // React Query for fetching order
  const {
    data: order,
    refetch,
    isFetching,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['trackOrder', trackingId],
    enabled: false, // fetch only when user submits
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/track-by-id/${trackingId}`);
      return res.data.order;
    },
  });

  const handleTrack = e => {
    e.preventDefault();
    if (!trackingId) return;
    refetch();
  };

  // Combine statusHistory + tracking into one chronological array
  const getTimeline = () => {
    if (!order) return [];
    const combined = [
      ...order.statusHistory.map(s => ({
        ...s,
        type: 'status',
      })),
      ...order.tracking.map(t => ({
        ...t,
        type: 'tracking',
      })),
    ];

    // Sort by date ascending
    return combined.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const timeline = getTimeline();

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-6 lg:m-6  bg-white dark:bg-white/10 shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

      {/* Input */}
      <form
        onSubmit={handleTrack}
        className="flex flex-col items-center md:flex-row gap-3 mb-6"
      >
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={e => setTrackingId(e.target.value)}
        />
        <Button className="w-full md:w-sm" type="submit" disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Track'}
        </Button>
      </form>

      {error && (
        <p className="text-red-600 mt-2">
          {error.response?.data?.message || 'Order not found'}
        </p>
      )}

      {order && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            {order.productName} ({order.trackingId})
          </h2>

          {/* Timeline */}
          <div className="space-y-4">
            {timeline.map((step, idx) => {
              const isLatest = idx === timeline.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-4 border-l-4 rounded-md ${
                    isLatest
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {step.status.charAt(0).toUpperCase() +
                        step.status.slice(1)}
                      {step.type === 'tracking' && ' (Tracking Update)'}
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
                  {step.note && (
                    <p className="text-gray-600">Notes: {step.note}</p>
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
