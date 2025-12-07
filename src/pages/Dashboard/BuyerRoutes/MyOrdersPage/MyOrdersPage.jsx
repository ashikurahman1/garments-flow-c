import { Button } from '@/components/ui/button';

const MyOrdersPage = () => {
  const orders = [
    {
      id: 'ORD-001',
      product: 'Premium Cotton Shirt',
      quantity: 5,
      status: 'Pending',
      payment: 'COD',
    },
    {
      id: 'ORD-002',
      product: 'Denim Jeans',
      quantity: 2,
      status: 'Approved',
      payment: 'PayFast',
    },
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
            {orders.map(item => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.product}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-sm">
                    {item.payment}
                  </span>
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <Button size="sm">View</Button>

                  {item.status === 'Pending' && (
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
