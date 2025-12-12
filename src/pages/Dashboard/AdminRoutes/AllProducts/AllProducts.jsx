import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import usePageTitle from '../../../../hooks/usePageTitle';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const AllProducts = () => {
  usePageTitle('All Products');
  const axiosSecure = useAxiosSecure();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['admin-all-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products');
      return res.data;
    },
  });

  // Toggle Show On Home

  const handleToggleHome = async (id, currentValue) => {
    try {
      await axiosSecure.patch(`/products/${id}/toggle-home`, {
        showOnHome: !currentValue,
      });

      Swal.fire({
        title: !currentValue ? 'Added to Home' : 'Removed from Home',
        toast: true,
        position: 'top-end',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        icon: !currentValue ? 'success' : 'info',
      });

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Product

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#92400e',
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`/products/${id}`);

    Swal.fire({
      title: 'Deleted Successfully',
      icon: 'success',
      timer: 1200,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });

    refetch();
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-white dark:bg-white/10 lg:m-5 rounded-xl">
      <h2 className="text-2xl font-semibold mb-5">All Products</h2>

      <div className="overflow-x-auto ">
        <table className="min-w-full border text-sm">
          <thead className="bg-amber-200 dark:bg-amber-900 border-b text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Show on Home</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <img
                    src={product.images?.[0]}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>

                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.category}</td>

                <td className="p-3">{product.managerEmail}</td>

                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={product.showOnHome}
                    onChange={() =>
                      handleToggleHome(product._id, product.showOnHome)
                    }
                  />
                </td>

                <td className=" text-right">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        (window.location.href = `/dashboard/edit-product/${product._id}`)
                      }
                      className="px-3 py-1 bg-blue-700 text-white dark:text-black rounded flex items-center gap-1"
                    >
                      <IconEdit size={16} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 bg-amber-800 text-white dark:text-black rounded flex items-center gap-1"
                    >
                      <IconTrash size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
