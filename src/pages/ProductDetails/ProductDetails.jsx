import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();

  // Example static product data
  const product = {
    _id: id,
    name: 'Classic T-Shirt',
    description: 'High-quality cotton t-shirt with a comfortable fit.',
    category: 'Tops',
    price: 25,
    quantity: 50,
    minOrder: 5,
    paymentOptions: ['Cash on Delivery', 'Online Payment'],
    features: ['100% Cotton', 'Machine Washable', 'Unisex'],
    image:
      'https://images.unsplash.com/photo-1523381214311-56c6b1f38c12?auto=format&fit=crop&w=800&q=80',
  };

  // Simulate logged-in user
  const user = { role: 'buyer', status: 'active', email: 'user@example.com' };

  const [orderQty, setOrderQty] = useState(product.minOrder);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleOrderQtyChange = e => {
    const value = Number(e.target.value);
    if (value >= product.minOrder && value <= product.quantity) {
      setOrderQty(value);
    }
  };

  const orderPrice = orderQty * product.price;

  const handleBooking = e => {
    e.preventDefault();
    alert('Booking submitted! (UI only)');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="bg-amber-50 min-h-screen py-20 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Info */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6"
          variants={fadeUp}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold text-amber-900 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Available Quantity:</strong> {product.quantity}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Minimum Order:</strong> {product.minOrder}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Payment Options:</strong>{' '}
            {product.paymentOptions.join(', ')}
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-2">
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </motion.div>

        {/* Booking Form */}
        {user && user.role !== 'admin' && user.role !== 'manager' && (
          <motion.div
            className="bg-white shadow-md rounded-xl p-6"
            variants={fadeUp}
          >
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              Book / Order
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleBooking}>
              <div>
                <Label className="mb-2">Email</Label>
                <Input type="email" value={user.email} readOnly />
              </div>

              <div>
                <Label className="mb-2">Product</Label>
                <Input type="text" value={product.name} readOnly />
              </div>

              <div>
                <Label className="mb-2">Price (per unit)</Label>
                <Input type="text" value={`$${product.price}`} readOnly />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2">First Name</Label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label className="mb-2">Last Name</Label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2">Order Quantity</Label>
                <Input
                  type="number"
                  value={orderQty}
                  min={product.minOrder}
                  max={product.quantity}
                  onChange={handleOrderQtyChange}
                  required
                />
                <p className="text-gray-500 text-sm">
                  Min: {product.minOrder}, Max: {product.quantity}
                </p>
              </div>

              <div>
                <Label className="mb-2">Order Price</Label>
                <Input type="text" value={`$${orderPrice}`} readOnly />
              </div>

              <div>
                <Label className="mb-2">Contact Number</Label>
                <Input
                  type="text"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="mb-2">Delivery Address</Label>
                <Textarea
                  rows={3}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="mb-2">Additional Notes / Instructions</Label>
                <Textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <Button type="submit" className="bg-amber-800 hover:opacity-90">
                Place Order
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetails;
