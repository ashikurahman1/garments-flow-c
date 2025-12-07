import { Button } from '@/components/ui/button';
import { IconTimeline } from '@tabler/icons-react';

const ApprovedOrders = () => {
  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>

      <table className="w-full border bg-white shadow p-3">
        <thead className="bg-amber-800 text-white">
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Approved Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2].map(row => (
            <tr key={row} className="border text-center">
              <td>#98765</td>
              <td>Sarah</td>
              <td>Pant</td>
              <td>120</td>
              <td>2025-02-02</td>
              <td className="p-2 ">
                <Button className="bg-amber-700 text-white flex gap-1">
                  <IconTimeline size={16} /> Add Tracking
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedOrders;
