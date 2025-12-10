import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import Swal from 'sweetalert2';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
const ManageProducts = () => {
  usePageTitle('Manage Products');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm();

  // Fetch all products using TanStack Query
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
  const filteredProducts = products.filter(p => {
    const t = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t)
    );
  });
  console.log(filteredProducts);

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async id => {
      return await axiosSecure.delete(`/products/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Product deleted successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      queryClient.invalidateQueries(['products']);
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

  // Open update modal
  const openUpdateModal = product => {
    setSelected(product);
    setPreviewImages(product.images);
    reset(product);
    setUpdateModal(true);
  };

  // Preview images when updating
  const handlePreview = e => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const urls = files.map(f => URL.createObjectURL(f));
    setPreviewImages(urls);
  };

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      return await axiosSecure.patch(`/products/${id}`, formData);
    },
    onSuccess: () => {
      Swal.fire('Updated!', 'Product updated successfully.', 'success');
      setUpdateModal(false);
      queryClient.invalidateQueries(['managerProducts', user?.email]);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update product', 'error');
    },
  });

  const onUpdate = async data => {
    try {
      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const imgFiles = document.getElementById('updateImages').files;
      for (let img of imgFiles) {
        formData.append('images', img);
      }

      updateMutation.mutate({
        id: selected._id,
        formData,
      });
    } catch {
      Swal.fire('Error', 'Failed to update product', 'error');
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
                    src={product.images?.[0]}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.paymentOption}</td>

                <td className="flex gap-2 pt-4">
                  <Button
                    className="bg-blue-600 text-white px-3 py-1"
                    onClick={() => openUpdateModal(product)}
                  >
                    <IconEdit size={16} />
                  </Button>

                  <Button
                    className="bg-red-600 text-white px-3 py-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <IconTrash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {updateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>

            <form
              onSubmit={handleSubmit(onUpdate)}
              encType="multipart/form-data"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Product Name */}
              <div>
                <Label>Product Name</Label>
                <Input
                  {...register('name', {
                    required: 'Product name is required',
                  })}
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <select
                  className="border rounded-md w-full p-3"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                >
                  <option value="">Select Category</option>
                  <option>Shirt</option>
                  <option>Pant</option>
                  <option>Jacket</option>
                  <option>Accessories</option>
                </select>
                <p className="text-red-500 text-sm">
                  {errors.category?.message}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  {...register('description', {
                    required: 'Description required',
                  })}
                />
                <p className="text-red-500 text-sm">
                  {errors.description?.message}
                </p>
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  {...register('price', { required: 'Price required' })}
                />
                <p className="text-red-500 text-sm">{errors.price?.message}</p>
              </div>

              {/* Available Quantity */}
              <div>
                <Label>Available Quantity</Label>
                <Input
                  type="number"
                  {...register('availableQuantity', {
                    required: 'Available quantity required',
                  })}
                />
                <p className="text-red-500 text-sm">
                  {errors.availableQuantity?.message}
                </p>
              </div>

              {/* MOQ */}
              <div>
                <Label>Minimum Order Quantity</Label>
                <Input
                  type="number"
                  {...register('moq', { required: 'MOQ is required' })}
                />
                <p className="text-red-500 text-sm">{errors.moq?.message}</p>
              </div>

              {/* Images */}
              <div className="md:col-span-2">
                <Label>Upload Images (Optional)</Label>
                <Input
                  id="updateImages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePreview}
                />

                <div className="flex gap-2 mt-3 flex-wrap">
                  {previewImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-24 h-24 border rounded-md"
                    />
                  ))}
                </div>
              </div>

              {/* Demo Video */}
              <div className="md:col-span-2">
                <Label>Demo Video Link (Optional)</Label>
                <Input type="text" {...register('demoVideo')} />
              </div>

              {/* Payment Option */}
              <div>
                <Label>Payment Option</Label>
                <select
                  className="border p-3 rounded-md w-full"
                  {...register('paymentOption', {
                    required: 'Payment option is required',
                  })}
                >
                  <option value="">Select</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="payfirst">PayFirst</option>
                </select>
              </div>

              {/* Show on Home */}
              <div className="flex items-center gap-3">
                <Controller
                  name="showOnHome"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <Label>Show on Home Page</Label>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  className="bg-gray-600"
                  onClick={() => setUpdateModal(false)}
                >
                  Close
                </Button>
                <Button className="bg-amber-800">Update Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
