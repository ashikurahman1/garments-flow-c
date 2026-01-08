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
      return res.data.products;
    },
  });

  // Toggle Show On Home
  console.log(products);
  console.log(products.length);

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
      confirmButtonColor: '#ef4444',
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
    <div className="p-6 lg:m-5">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-display font-bold mb-6 text-foreground">All Products</h2>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50 border-b border-border text-left">
              <tr>
                <th className="p-4 font-semibold text-foreground">Image</th>
                <th className="p-4 font-semibold text-foreground">Name</th>
                <th className="p-4 font-semibold text-foreground">Price</th>
                <th className="p-4 font-semibold text-foreground">Category</th>
                <th className="p-4 font-semibold text-foreground">Created By</th>
                <th className="p-4 font-semibold text-foreground">Show on Home</th>
                <th className="p-4 font-semibold text-right text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-card/30">
              {products.length > 0 ? (
                products.map(product => (
                  <tr
                    key={product._id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-border shadow-sm">
                        <img
                          src={product.images?.[0]}
                          className="w-full h-full object-cover"
                          alt={product.name}
                        />
                      </div>
                    </td>

                    <td className="p-4 font-medium text-foreground">{product.name}</td>
                    <td className="p-4 font-mono text-primary font-semibold">${product.price}</td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>

                    <td className="p-4 text-muted-foreground">{product.managerEmail}</td>

                    <td className="p-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.showOnHome}
                          onChange={() =>
                            handleToggleHome(product._id, product.showOnHome)
                          }
                        />
                         <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            (window.location.href = `/dashboard/edit-product/${product._id}`)
                          }
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 rounded-lg flex items-center gap-1.5 transition-colors border border-blue-500/20"
                        >
                          <IconEdit size={16} /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 rounded-lg flex items-center gap-1.5 transition-colors border border-red-500/20"
                        >
                          <IconTrash size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-muted-foreground">No Products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
