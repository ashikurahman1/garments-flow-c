import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
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
      confirmButtonColor: '#ef4444',
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:m-6">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Manage Products</h2>

        {/* Search */}
        <div className="mb-6">
           <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 bg-background/50 border border-input rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary outline-none transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Image</th>
                <th className="p-4 font-semibold text-foreground">Name</th>
                <th className="p-4 font-semibold text-foreground">Price</th>
                <th className="p-4 font-semibold text-foreground">Payment</th>
                <th className="p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-card/30">
              {filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <img
                      src={
                        product.images?.[0]?.startsWith('http')
                          ? product.images[0]
                          : `http://localhost:5000/${product.images[0]}`
                      }
                      className="w-16 h-16 object-cover rounded-lg border border-border"
                      alt={product.name}
                    />
                  </td>
                  <td className="p-4 font-medium text-foreground">{product.name}</td>
                  <td className="p-4 font-mono text-primary">${product.price}</td>
                  <td className="p-4 text-sm text-muted-foreground uppercase">{product.paymentOption}</td>

                  <td className="p-4 flex gap-2 items-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/dashboard/edit-product/${product._id}`)
                      }
                      className="border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <IconEdit size={16} className="mr-1" /> Edit
                    </Button>

                    {/* Delete */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product._id)}
                      className="shadow-sm"
                    >
                      <IconTrash size={16} className="mr-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
