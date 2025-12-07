import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const AddProduct = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div className="bg-white shadow p-6 lg:m-5 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="mb-2">Product Name</Label>
          <Input type="text" placeholder="Enter product name" required />
        </div>

        <div>
          <Label className="mb-2">Category</Label>
          <select className="border rounded-md w-full p-3">
            <option>Shirt</option>
            <option>Pant</option>
            <option>Jacket</option>
            <option>Accessories</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2">Description</Label>
          <Textarea placeholder="Write product details..." rows={4} required />
        </div>

        <div>
          <Label className="mb-2">Price</Label>
          <Input type="number" placeholder="0" required />
        </div>

        <div>
          <Label className="mb-2">Available Quantity</Label>
          <Input type="number" placeholder="0" required />
        </div>

        <div>
          <Label className="mb-2">Minimum Order Quantity</Label>
          <Input type="number" placeholder="0" required />
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2">Upload Images</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          <div className="mt-3 flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2">Demo Video Link (Optional)</Label>
          <Input type="text" placeholder="Paste video link" />
        </div>

        <div>
          <Label className="mb-2">Payment Option</Label>
          <select className="border rounded-md w-full p-3">
            <option value="cod">Cash on Delivery</option>
            <option value="payfast">PayFast Online Payment</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <Switch />
          <Label className="mb-2">Show on Home Page</Label>
        </div>

        <Button className="bg-amber-800 hover:bg-amber-700 md:col-span-2">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
