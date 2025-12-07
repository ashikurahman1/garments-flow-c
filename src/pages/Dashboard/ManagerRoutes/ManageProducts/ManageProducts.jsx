import { Button } from '@/components/ui/button';
import { IconTrash, IconEdit } from '@tabler/icons-react';

const ManageProducts = () => {
  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 rounded w-full mb-4"
      />

      <table className="w-full border">
        <thead className="bg-amber-800 text-white">
          <tr>
            <th className="p-2">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3].map(row => (
            <tr key={row} className="border">
              <td className="p-2">
                <img
                  src="https://via.placeholder.com/60"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>Sample Product</td>
              <td>$45</td>
              <td>COD</td>
              <td className="flex gap-2 p-2">
                <Button className="bg-blue-600 text-white px-3 py-1">
                  <IconEdit size={16} />
                </Button>
                <Button className="bg-red-600 text-white px-3 py-1">
                  <IconTrash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
