import React from 'react';
import { Button } from '@/components/ui/button';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const AdminAllProducts = () => {
  const products = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1523381214311-56c6b1f38c12?auto=format&fit=crop&w=80&q=80',
      name: 'Classic T-Shirt',
      price: 25,
      category: 'Tops',
      createdBy: 'John Doe',
      showOnHome: true,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=80&q=80',
      name: 'Jeans',
      price: 40,
      category: 'Bottoms',
      createdBy: 'Jane Smith',
      showOnHome: false,
    },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6 ">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Show on Home
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.createdBy}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={product.showOnHome}
                    readOnly
                  />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button className="bg-amber-800 hover:opacity-90 flex items-center gap-1">
                    <IconEdit size={16} /> Update
                  </Button>
                  <Button className="bg-red-600 hover:opacity-90 flex items-center gap-1">
                    <IconTrash size={16} /> Delete
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

export default AdminAllProducts;
