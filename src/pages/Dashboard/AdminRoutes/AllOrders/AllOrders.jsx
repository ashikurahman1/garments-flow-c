import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconEye } from '@tabler/icons-react';

const AllOrders = () => {
  const [filter, setFilter] = useState('All');

  const orders = [
    {
      id: 'ORD001',
      user: 'John Doe',
      product: 'Classic T-Shirt',
      quantity: 10,
      status: 'Pending',
    },
    {
      id: 'ORD002',
      user: 'Jane Smith',
      product: 'Jeans',
      quantity: 5,
      status: 'Approved',
    },
  ];

  const filteredOrders =
    filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">All Orders</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-4">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            className="bg-amber-800 hover:opacity-90 text-amber-100"
            onClick={() => setFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">{order.product}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">
                  <Button className="bg-amber-800 hover:opacity-90 flex items-center gap-1">
                    <IconEye size={16} /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
