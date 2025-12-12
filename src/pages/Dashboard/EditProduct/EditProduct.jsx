import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import usePageTitle from '../../../hooks/usePageTitle';

const EditProduct = () => {
  usePageTitle('Edit Product');

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // Fetch product data using React Query
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Set form default values when product loads
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('category', product.category);
      setValue('price', product.price);
      setValue('availableQuantity', product.availableQuantity);
      setValue('moq', product.moq);
      setValue('demoVideo', product.demoVideo || '');
      setValue('paymentOption', product.paymentOption);
      setValue('showOnHome', product.showOnHome);

      setExistingImages(product.images || []);
    }
  }, [product, setValue]);

  // Handle image preview
  const handleImagePreview = e => {
    const files = Array.from(e.target.files);
    if (!files.length) {
      setPreviewImages([]);
      return;
    }
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  // Update product handler
  const handleUpdateProduct = async data => {
    const imgFiles = document.getElementById('editProductImages').files;
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', Number(data.price));
      formData.append('availableQuantity', Number(data.availableQuantity));
      formData.append('moq', Number(data.moq));
      formData.append('demoVideo', data.demoVideo || '');
      formData.append('paymentOption', data.paymentOption);
      formData.append('showOnHome', data.showOnHome ? 'true' : 'false');

      if (imgFiles.length > 0) {
        for (let img of imgFiles) {
          formData.append('images', img);
        }
      }

      const res = await axiosSecure.patch(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        Swal.fire({
          title: 'Product Updated',
          text: 'Your product was successfully updated.',
          icon: 'success',
          confirmButtonColor: '#92400e',
        });
        navigate('/dashboard/all-products');
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed to Update',
        text: 'Something went wrong. Try again later.',
        icon: 'error',
        confirmButtonColor: '#92400e',
      });
    }
  };

  if (isLoading) return <p className="p-5">Loading product...</p>;

  return (
    <div className="bg-white shadow p-6 lg:m-5 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form
        onSubmit={handleSubmit(handleUpdateProduct)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <Label>Product Name</Label>
          <Input
            {...register('name', { required: 'Product name is required' })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="border p-3 rounded-md w-full"
          >
            <option value="">Select Category</option>
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
            <option>Accessories</option>
          </select>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <Label>Description</Label>
          <Textarea rows={4} {...register('description')} />
        </div>

        {/* Price */}
        <div>
          <Label>Price</Label>
          <Input type="number" {...register('price', { required: true })} />
        </div>

        {/* Quantity */}
        <div>
          <Label>Available Quantity</Label>
          <Input
            type="number"
            {...register('availableQuantity', { required: true })}
          />
        </div>

        {/* MOQ */}
        <div>
          <Label>Minimum Order Quantity</Label>
          <Input type="number" {...register('moq', { required: true })} />
        </div>

        {/* Existing Images */}
        <div className="md:col-span-2">
          <Label>Existing Images</Label>
          <div className="mt-3 flex gap-2 flex-wrap">
            {existingImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div className="md:col-span-2">
          <Label>Upload New Images (optional)</Label>
          <Input
            id="editProductImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagePreview}
          />
          <div className="mt-3 flex gap-2 flex-wrap">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Demo Video */}
        <div className="md:col-span-2">
          <Label>Demo Video Link</Label>
          <Input type="text" {...register('demoVideo')} />
        </div>

        {/* Payment Option */}
        <div>
          <Label>Payment Option</Label>
          <select
            {...register('paymentOption')}
            className="border p-3 rounded-md w-full"
          >
            <option value="">Select</option>
            <option value="cod">Cash on Delivery</option>
            <option value="payfirst">Pay First</option>
          </select>
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-3">
          <Controller
            name="showOnHome"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={v => field.onChange(v)}
              />
            )}
          />
          <Label>Show on Homepage</Label>
        </div>

        <Button
          type="submit"
          className="bg-amber-800 hover:bg-amber-700 md:col-span-2"
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;
