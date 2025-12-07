const TrackOrderPage = () => {
  const trackingSteps = [
    { step: 'Cutting Completed', date: '2025-01-04 10:30 AM' },
    { step: 'Sewing Started', date: '2025-01-05 09:00 AM' },
    { step: 'Finishing', date: '2025-01-06 03:45 PM' },
    { step: 'QC Checked', date: '2025-01-07 12:20 PM' },
    { step: 'Packed', date: '2025-01-07 06:00 PM' },
    { step: 'Shipped', date: '2025-01-08 02:15 PM' },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>

      <div className="space-y-6 relative border-l-4 border-amber-700 pl-6">
        {trackingSteps.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute  -left-[34px] top-0 w-4 h-4 rounded-full bg-amber-700"></div>

            <div className="">
              <h3 className="text-lg font-semibold">{item.step}</h3>
              <p className="text-sm text-gray-600">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrderPage;
