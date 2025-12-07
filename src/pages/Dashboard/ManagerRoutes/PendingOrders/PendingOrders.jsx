import { Button } from '@/components/ui/button';
import { IconEye } from '@tabler/icons-react';

const PendingOrders = () => {
  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Pending Orders</h2>

      <table className="w-full border">
        <thead className="bg-amber-800 text-white">
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
          {[1, 2, 3].map(row => (
            <tr key={row} className="border">
              <td>#12345</td>
              <td>John Doe</td>
              <td>T-Shirt</td>
              <td>50</td>
              <td>2025-02-01</td>
              <td className="flex gap-2 p-2">
                <Button className="bg-green-600 text-white">Approve</Button>
                <Button className="bg-red-600 text-white">Reject</Button>
                <Button>
                  <IconEye size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
