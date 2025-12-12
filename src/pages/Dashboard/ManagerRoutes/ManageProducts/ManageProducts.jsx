import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';
const ManageProducts = () => {
  usePageTitle('Manage Products');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Fetch all products for the manager
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['managerProducts', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/manager/products?email=${user?.email}`
      );
      return res.data;
    },
  });
  // Filter by search text
  const filteredProducts = (products || []).filter(p => {
    const t = search.toLowerCase();
    const name = Array.isArray(p.name) ? p.name[0] : p.name || '';
    const category = Array.isArray(p.category)
      ? p.category[0]
      : p.category || '';
    return name.toLowerCase().includes(t) || category.toLowerCase().includes(t);
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async id => axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Product deleted successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(['managerProducts', user?.email]);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete product', 'error');
    },
  });

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      confirmButtonColor: '#92400E',
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-lg">Loading products...</div>;
  }

  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto w-full">
        <table className=" border min-w-max w-full  ">
          <thead className="bg-amber-800 text-white text-left">
            <tr className="">
              <th className="p-2">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id} className="border">
                <td className="p-2">
                  <img
                    src={
                      product.images?.[0]?.startsWith('http')
                        ? product.images[0]
                        : `http://localhost:5000/${product.images[0]}`
                    }
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.paymentOption}</td>

                <td className="flex gap-2 pt-4">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/edit-product/${product._id}`)
                    }
                    className="px-3 py-1 bg-amber-800 text-white rounded flex items-center gap-1"
                  >
                    <IconEdit size={16} /> Edit
                  </Button>

                  {/* Delete */}
                  <Button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1"
                  >
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

export default ManageProducts;
