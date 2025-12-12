import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import usePageTitle from '../../../../hooks/usePageTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
const AddProduct = () => {
  usePageTitle('Add Product');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [previewImages, setPreviewImages] = useState([]);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm();

  const handleImagePreview = e => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setPreviewImages([]);
      setError('images', { message: 'Please select at least 1 image' });
      return;
    }
    clearErrors('images');

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(imageUrls);
  };

  const handleAddProduct = async data => {
    console.log('Form data:', data);

    const imgFiles = document.getElementById('productImages').files;
    if (imgFiles.length === 0) {
      setError('images', { message: 'Product images are required' });
      return;
    }
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', Number(data.price));
      formData.append('availableQuantity', Number(data.availableQuantity));
      formData.append('moq', Number(data.moq));
      formData.append('demoVideo', data.demoVideo || '');
      formData.append('managerEmail', user?.email);
      formData.append('paymentOption', data.paymentOption);
      formData.append('showOnHome', data.showOnHome ? 'true' : 'false'); // <-- send as string
      for (let img of imgFiles) {
        formData.append('images', img);
      }

      const res = await axiosSecure.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      for (let img of imgFiles) {
        formData.append('images', img);
      }

      if (res.data.success) {
        Swal.fire({
          title: 'Product Added Successfully',
          text: 'Your new product has been added',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
        setPreviewImages([]);
        navigate('/dashboard/manage-products');
      }
    } catch (error) {
      console.error('Add product error:', error?.response?.data || error);
      Swal.fire({
        title: 'Failed to Add Product',
        text: 'Please try again later',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="bg-white dark:bg-white/10 shadow p-6 lg:m-5 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(handleAddProduct)}
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <Label>Product Name</Label>
          <Input
            placeholder="Enter product name"
            {...register('name', { required: 'Product name is required' })}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        {/* Category */}
        <div>
          <Label>Category</Label>
          <select
            className="border rounded-md w-full p-3"
            {...register('category', { required: 'Category is required' })}
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
          <Textarea
            rows={4}
            {...register('description', { required: 'Description required' })}
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
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
          <Label>Upload Images</Label>
          <Input
            id="productImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagePreview}
          />
          <p className="text-red-500 text-sm">{errors.images?.message}</p>

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

        {/* Video Link */}
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
              required: 'Please choose a payment option',
            })}
          >
            <option value="">Select</option>
            <option value="cod">Cash on Delivery</option>
            <option value="payfirst">PayFirst</option>
          </select>
          <p className="text-red-500 text-sm">
            {errors.paymentOption?.message}
          </p>
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
                onCheckedChange={val => field.onChange(val)}
              />
            )}
          />

          <Label>Show on Home Page</Label>
        </div>

        <Button
          type="submit"
          className="bg-amber-800 hover:bg-amber-700 md:col-span-2"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
