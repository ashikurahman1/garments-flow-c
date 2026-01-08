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
import useRole from '../../../../hooks/useRole';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
const AddProduct = () => {
  usePageTitle('Add Product');

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [previewImages, setPreviewImages] = useState([]);
  const { user } = useAuth();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const userStatus = userInfo?.user?.status;

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
      formData.append('showOnHome', data.showOnHome ? 'true' : 'false');
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
          confirmButtonColor: '#4f46e5',
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
        confirmButtonColor: '#4f46e5',
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-6 lg:m-6">
       <div className="glass-card rounded-xl p-8 border border-white/20">
      {userStatus === 'active' ? (
        <>
          <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Add New Product</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(handleAddProduct)}
            encType="multipart/form-data"
          >
            {/* Product Name */}
            <div>
              <Label className="mb-2 block">Product Name</Label>
              <Input
                placeholder="Enter product name"
                {...register('name', { required: 'Product name is required' })}
                className="bg-background/50 border-input font-medium"
              />
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            </div>

            {/* Category */}
            <div>
              <Label className="mb-2 block">Category</Label>
              <select
                className="w-full border border-input rounded-md p-2.5 bg-background/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm font-medium"
                {...register('category', { required: 'Category is required' })}
              >
                <option value="">Select Category</option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
              <p className="text-red-500 text-sm mt-1">{errors.category?.message}</p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label className="mb-2 block">Description</Label>
              <Textarea
                rows={4}
                {...register('description', {
                  required: 'Description required',
                })}
                className="bg-background/50 border-input font-medium resize-none"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>

            {/* Price */}
            <div>
              <Label className="mb-2 block">Price</Label>
              <Input
                type="number"
                {...register('price', { required: 'Price required' })}
                className="bg-background/50 border-input font-medium"
              />
              <p className="text-red-500 text-sm mt-1">{errors.price?.message}</p>
            </div>

            {/* Available Quantity */}
            <div>
              <Label className="mb-2 block">Available Quantity</Label>
              <Input
                type="number"
                {...register('availableQuantity', {
                  required: 'Available quantity required',
                })}
                className="bg-background/50 border-input font-medium"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.availableQuantity?.message}
              </p>
            </div>

            {/* MOQ */}
            <div>
              <Label className="mb-2 block">Minimum Order Quantity</Label>
              <Input
                type="number"
                {...register('moq', { required: 'MOQ is required' })}
                className="bg-background/50 border-input font-medium"
              />
              <p className="text-red-500 text-sm mt-1">{errors.moq?.message}</p>
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <Label className="mb-2 block">Upload Images</Label>
              <Input
                id="productImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagePreview}
                className="bg-background/50 border-input cursor-pointer file:cursor-pointer file:text-primary file:font-semibold"
              />
              <p className="text-red-500 text-sm mt-1">{errors.images?.message}</p>

              <div className="mt-4 flex gap-3 flex-wrap">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-24 h-24 object-cover rounded-lg border border-border shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Video Link */}
            <div className="md:col-span-2">
              <Label className="mb-2 block">Demo Video Link (Optional)</Label>
              <Input type="text" {...register('demoVideo')} className="bg-background/50 border-input font-medium" />
            </div>

            {/* Payment Option */}
            <div>
              <Label className="mb-2 block">Payment Option</Label>
              <select
                className="w-full border border-input rounded-md p-2.5 bg-background/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm font-medium"
                {...register('paymentOption', {
                  required: 'Please choose a payment option',
                })}
              >
                <option value="">Select</option>
                <option value="cod">Cash on Delivery</option>
                <option value="payfirst">PayFirst</option>
              </select>
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentOption?.message}
              </p>
            </div>

            {/* Show on Home */}
            <div className="flex items-center gap-3 md:pt-8">
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
              className="btn-premium bg-primary text-primary-foreground hover:bg-primary/90 md:col-span-2 h-12 text-lg shadow-lg shadow-primary/20"
            >
              Add Product
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-destructive mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">Only active managers can add products.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddProduct;
