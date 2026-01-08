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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { data: userStatus } = useQuery({
    queryKey: ['userStatus', user?.email],
    queryFn: async () => {
       if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });
  const userCurrentStatus = userStatus?.user?.status;

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${id}`);
      return res.data;
    },
  });

   // Fetch Related Products (Mocking by fetching random or same category)
   const { data: relatedProducts } = useQuery({
    queryKey: ['relatedProducts', product?.category],
    queryFn: async () => {
        if(!product) return [];
        const res = await axiosPublic.get(`/products?limit=4`);
        return res.data.products.filter(p => p._id !== id).slice(0, 4);
    },
    enabled: !!product
   });

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      quantity: 1, // Will be updated when product loads
      contact: '',
      address: '',
      notes: '',
    },
  });
  
  // Update default quantity when product loads
  React.useEffect(() => {
    if (product) {
        reset(formValues => ({ ...formValues, quantity: product.moq || 1 }));
    }
  }, [product, reset]);


  const quantity = watch('quantity', product?.moq || 1);
  const orderPrice = quantity * (product?.price || 0);

  const onSubmit = async data => {
    if (!user) {
        navigate('/login');
        return;
    }

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
    return <div className="min-h-screen flex items-center justify-center text-xl text-destructive">Product not found</div>;

  const images = product.images && product.images.length > 0 ? product.images : ['https://placehold.co/600x400?text=No+Image'];

  return (
    <div className="bg-background min-h-screen py-24 lg:py-32">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Gallery & Info */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          
          {/* Left: Image Gallery */}
          <div className="flex-1 w-full lg:max-w-[50%]">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 mb-4">
                 <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className="w-full h-[400px] lg:h-[500px]"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <img src={img} alt={`${product.name} ${index + 1}`} className="max-h-full max-w-full object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
             {/* Thumbs */}
             {images.length > 1 && (
                 <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Navigation, Thumbs]}
                    className="thumbs-swiper h-24 w-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all opacity-70 hover:opacity-100 swiper-slide-thumb-active:border-primary swiper-slide-thumb-active:opacity-100">
                             <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
             )}
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-8">
            <div>
                 <span className="text-primary text-sm font-bold uppercase tracking-widest">{product.category}</span>
                <h1 className="text-3xl lg:text-4xl font-extrabold font-display mt-2 mb-4 text-foreground">{product.name}</h1>
                <div className="text-2xl font-bold text-primary">${product.price} <span className="text-sm font-normal text-muted-foreground">/ unit</span></div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <span className="block text-sm text-muted-foreground mb-1">Availability</span>
                    <span className="font-semibold text-foreground">{product.availableQuantity} units</span>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <span className="block text-sm text-muted-foreground mb-1">MOQ</span>
                    <span className="font-semibold text-foreground">{product.moq} units</span>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                    <span className="block text-sm text-muted-foreground mb-1">Payment Type</span>
                    <span className="font-semibold text-foreground capitalize">{product.paymentOption}</span>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border">
                     <span className="block text-sm text-muted-foreground mb-1">Material</span>
                    <span className="font-semibold text-foreground">Premium Cotton</span> 
                </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-border">
                {userCurrentStatus !== 'active' && (
                    <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        Please verify your account to place orders.
                    </div>
                )}
                
                <div className="flex gap-4">
                    {user && userCurrentStatus === 'active' ? (
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                                <Button size="lg" className="flex-1 h-14 text-lg rounded-full shadow-lg shadow-primary/20 btn-premium bg-primary text-primary-foreground">
                                    Book Production
                                </Button>
                            </DialogTrigger>
                             <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Place Production Order</DialogTitle>
                                    <DialogDescription>
                                        Complete the details below to initiate your order.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                        <div><span className="text-xs text-muted-foreground">Product</span><p className="font-medium">{product.name}</p></div>
                                        <div><span className="text-xs text-muted-foreground">Price/Unit</span><p className="font-medium">${product.price}</p></div>
                                        <div><span className="text-xs text-muted-foreground">Total Cost</span><p className="font-bold text-primary">${orderPrice}</p></div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>First Name</Label>
                                            <Input {...register('firstName', { required: true })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Last Name</Label>
                                            <Input {...register('lastName', { required: true })} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Quantity (Min: {product.moq})</Label>
                                        <Input
                                            type="number"
                                            {...register('quantity', {
                                                required: true,
                                                min: product.moq,
                                                max: product.availableQuantity,
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Contact Number</Label>
                                        <Input {...register('contact', { required: true })} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Delivery Address</Label>
                                        <Textarea {...register('address', { required: true })} rows={2} />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Notes (Optional)</Label>
                                        <Textarea {...register('notes')} rows={2} />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Confirm Order</Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    ) : (
                         <Button size="lg" disabled className="flex-1 h-14 text-lg rounded-full opacity-50 cursor-not-allowed">
                            {user ? 'Account verification needed' : 'Login to Book'}
                        </Button>
                    )}
                    
                    {product.demoVideo && (
                         <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-full border-2 border-primary/20 hover:bg-primary/5 hover:border-primary text-primary">
                            <a href={product.demoVideo} target="_blank" rel="noreferrer">
                                Watch Video
                            </a>
                        </Button>
                    )}
                </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="mb-20">
            <div className="flex border-b border-border/60 mb-8 overflow-x-auto">
                {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 font-semibold capitalize transition-all relative whitespace-nowrap
                            ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
                        `}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>
            
            <div className="min-h-[200px]">
                {activeTab === 'description' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-loose">
                        <p>{product.description}</p>
                        <p>Experience the finest quality with our {product.name}. Designed for durability and style, this product meets global export standards.</p>
                    </motion.div>
                )}
                {activeTab === 'specifications' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 max-w-3xl">
                        <div className="flex justify-between border-b border-border/50 py-3">
                            <span className="font-medium">Category</span>
                            <span className="text-muted-foreground">{product.category}</span>
                        </div>
                         <div className="flex justify-between border-b border-border/50 py-3">
                            <span className="font-medium">SKU</span>
                            <span className="text-muted-foreground">GF-{product._id.slice(-6).toUpperCase()}</span>
                        </div>
                         <div className="flex justify-between border-b border-border/50 py-3">
                            <span className="font-medium">Weight</span>
                            <span className="text-muted-foreground">0.5 kg (Approx)</span>
                        </div>
                         <div className="flex justify-between border-b border-border/50 py-3">
                            <span className="font-medium">Origin</span>
                            <span className="text-muted-foreground">Bangladesh</span>
                        </div>
                    </motion.div>
                )}
                {activeTab === 'reviews' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center text-muted-foreground">
                        <div className="flex justify-center mb-4 text-yellow-500">
                             {[1,2,3,4,5].map(i => <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                        </div>
                        <p className="text-lg">No reviews yet. Be the first to review this product!</p>
                    </motion.div>
                )}
            </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
            <div>
                 <SectionTitle title="You May Also Like" subtitle="Related Items" />
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((item, idx) => (
                        <div key={item._id} className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => navigate(`/products/${item._id}`)}>
                            <div className="h-60 overflow-hidden">
                                <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-lg mb-1 line-clamp-1">{item.name}</h4>
                                <p className="text-primary font-medium">${item.price}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
