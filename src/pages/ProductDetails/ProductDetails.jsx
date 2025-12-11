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
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react';

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
  console.log(product);

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
      status: product.paymentOption === 'payfirst' ? 'initiated ' : 'pending',
    };

    try {
      const res = await axiosSecure.post('/orders', bookingData);

      if (res.data.success) {
        setIsModalOpen(false);
        reset();

        if (product.paymentOption === 'payfirst') {
          navigate(`/payment/${res.data.orderId}`);
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

  if (isLoading) return <p className="text-center py-20">Loading...</p>;
  if (!product)
    return <p className="text-center py-20 text-red-600">Product not found</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Images & Demo Video */}
        <div className="flex-1 space-y-4">
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={product.name}
              className="w-full h-72 object-cover rounded-lg shadow"
            />
          ))}
          {product.demoVideo && (
            <a
              href={product.demoVideo}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Watch Demo Video
            </a>
          )}
        </div>

        {/* Right Side: Product Info & Booking */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Available Quantity:</strong> {product.availableQuantity}
          </p>
          <p>
            <strong>Minimum Order:</strong> {product.moq}
          </p>
          <p>
            <strong>Payment Option:</strong> {product.paymentOption}
          </p>

          {user && product.paymentOption && (
            <Button
              className="bg-amber-800 hover:opacity-90 mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              Booking Now
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl w-full space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <DialogTitle className="text-2xl font-bold">
              Place Your Order
            </DialogTitle>
            <Description>
              Fill out the booking form to place your order.
            </Description>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <Label>Email</Label>
                <Input value={user.email} readOnly />
              </div>
              <div>
                <Label>Product</Label>
                <Input value={product.name} readOnly />
              </div>
              <div>
                <Label>Price (per unit)</Label>
                <Input value={`$${product.price}`} readOnly />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <Input type="text" value={`$${orderPrice}`} readOnly />
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
                <Button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-800 hover:opacity-90">
                  Place Order
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
