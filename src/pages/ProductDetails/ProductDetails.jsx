import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      quantity: product?.moq || 1,
      contact: '',
      address: '',
      notes: '',
    },
  });

  const quantity = watch('quantity', product?.moq || 1);
  const orderPrice = quantity * (product?.price || 0);

  const onSubmit = async data => {
    if (!user) return;

    const bookingData = {
      userEmail: user.email,
      productId: product._id,
      productName: product.name,
      quantity: data.quantity,
      price: orderPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      address: data.address,
      notes: data.notes,
      paymentOption: product.paymentOption,
      status: product.paymentOption === 'payfirst' ? 'initiated' : 'pending',
    };

    try {
      const res = await axiosSecure.post('/orders', bookingData);

      if (res.data.success) {
        setIsModalOpen(false);
        reset();

        if (product.paymentOption === 'payfirst') {
          navigate(`/payment?trackingId=${res.data.trackingId}`);
        } else {
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been submitted and is pending manager approval.',
            icon: 'success',
          });
          navigate('/dashboard/my-orders');
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Failed',
        text: error.response?.data?.message || 'Something went wrong!',
        icon: 'error',
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!product)
    return <p className="text-center py-20 text-red-600">Product not found</p>;

  return (
    <div className="container mx-auto py-20 lg:py-30 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Images & Demo Video */}
        <div className="flex-1 space-y-4">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>

          {product.demoVideo && (
            <a
              href={product.demoVideo}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline block mt-2"
            >
              Watch Demo Video
            </a>
          )}
        </div>

        {/* Right Side: Product Info & Booking */}
        <div className="flex-1 space-y-4">
          <div className="bg-white shadow-lg rounded-xl p-6 space-y-3">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8">
              {product.name}
            </h2>
            <p>{product.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="shadow-md p-5 rounded-md hover:bg-amber-800/10 hover:-translate-y-1.5 transition ">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="shadow-md p-5 rounded-md hover:bg-amber-800/10 hover:-translate-y-1.5 transition">
                <strong>Price:</strong> ${product.price}
              </div>
              <div className="shadow-md p-5 rounded-md hover:bg-amber-800/10 hover:-translate-y-1.5 transition">
                <strong>Available Quantity:</strong> {product.availableQuantity}
              </div>
              <div className="shadow-md p-5 rounded-md hover:bg-amber-800/10 hover:-translate-y-1.5 transition">
                <strong>Minimum Order:</strong> {product.moq}
              </div>
              <div className="shadow-md p-5 rounded-md hover:bg-amber-800/10 hover:-translate-y-1.5 transition">
                <strong>Payment Option:</strong> {product.paymentOption}
              </div>
            </div>

            {user && product.paymentOption && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-amber-800 hover:opacity-90 mt-4 w-full">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Place Your Order</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to book this product.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mt-4"
                  >
                    <div>
                      <p>Email: {user.email}</p>
                      <p>Product: {product.name}</p>
                      <p>Price: {`$ ${product.price}`}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input {...register('firstName', { required: true })} />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input {...register('lastName', { required: true })} />
                      </div>
                    </div>

                    <div>
                      <Label>Order Quantity</Label>
                      <Input
                        type="number"
                        {...register('quantity', {
                          required: true,
                          min: product.moq,
                          max: product.availableQuantity,
                          valueAsNumber: true,
                        })}
                      />
                      <p className="text-gray-500 text-sm">
                        Min: {product.moq}, Max: {product.availableQuantity}
                      </p>
                    </div>

                    <div>
                      <Label>Order Price</Label>
                      <Input value={`$${orderPrice}`} readOnly />
                    </div>

                    <div>
                      <Label>Contact Number</Label>
                      <Input {...register('contact', { required: true })} />
                    </div>

                    <div>
                      <Label>Delivery Address</Label>
                      <Textarea
                        {...register('address', { required: true })}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Additional Notes</Label>
                      <Textarea {...register('notes')} rows={3} />
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-amber-800 hover:opacity-90"
                      >
                        Place Order
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
