import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import usePageTitle from '../../../../hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { IconEye, IconPlus } from '@tabler/icons-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const ApprovedOrders = () => {
  usePageTitle('Approved Orders');
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openView, setOpenView] = useState(false);

  // Tracking update form state
  const [trackStatus, setTrackStatus] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  // Fetch Approved Orders
  const { data, isLoading } = useQuery({
    queryKey: ['approved-orders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/orders/approved');
      return res.data;
    },
  });

  const orders = Array.isArray(data) ? data : [];

  // Mutation: Add Tracking
  const trackingMutation = useMutation({
    mutationFn: async payload => {
      return axiosSecure.patch(`/orders/${payload.id}/tracking`, payload.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['approved-orders']);
      setOpenModal(false);
    },
  });

  const handleAddTracking = () => {
    if (!trackStatus) return;

    trackingMutation.mutate({
      id: selected._id,
      data: {
        status: trackStatus,
        location,
        note,
        date: new Date().toISOString(),
      },
    });
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 shadow rounded-xl lg:m-6">
      <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>

      <div className="overflow-x-auto shadow bg-white rounded-md">
        <table className="table-auto w-full text-left">
          <thead className="bg-amber-700 text-white">
            <tr>
              <th className="p-2">Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Approved Date</th>
              <th>Tracking</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border">
                <td className="p-2">{order._id}</td>
                <td>{order.buyerEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.approvedAt).toLocaleDateString()}</td>

                <td className="flex gap-2 p-2">
                  {/* Add Tracking Button */}
                  <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-amber-700 text-white"
                        onClick={() => {
                          setSelected(order);
                          setOpenModal(true);
                        }}
                      >
                        <IconPlus size={16} /> Add Tracking
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Tracking Update</DialogTitle>
                      </DialogHeader>

                      <div className="flex flex-col gap-3 mt-2">
                        <Label>Status</Label>
                        <Select onValueChange={value => setTrackStatus(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cutting Completed">
                              Cutting Completed
                            </SelectItem>
                            <SelectItem value="Sewing Started">
                              Sewing Started
                            </SelectItem>
                            <SelectItem value="Finishing">Finishing</SelectItem>
                            <SelectItem value="QC Checked">
                              QC Checked
                            </SelectItem>
                            <SelectItem value="Packed">Packed</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Out for Delivery">
                              Out for Delivery
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Label>Location</Label>
                        <Input
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          placeholder="Factory/warehouse location"
                        />

                        <Label>Note</Label>
                        <Textarea
                          value={note}
                          onChange={e => setNote(e.target.value)}
                          placeholder="Optional details"
                        />

                        <Button
                          className="bg-green-600 text-white mt-4"
                          onClick={handleAddTracking}
                        >
                          Save Tracking Update
                        </Button>
                      </div>

                      <DialogClose asChild>
                        <Button className="mt-3">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>

                  {/* View Tracking Timeline */}
                  <Dialog open={openView} onOpenChange={setOpenView}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-blue-700 text-white"
                        onClick={() => {
                          setSelected(order);
                          setOpenView(true);
                        }}
                      >
                        <IconEye size={16} />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tracking Timeline</DialogTitle>
                      </DialogHeader>

                      <DialogDescription className="mt-4">
                        {selected?.tracking?.length > 0 ? (
                          selected.tracking.map((t, idx) => (
                            <div key={idx} className="mb-3 border-b pb-2">
                              <div className="font-bold">{t.status}</div>
                              <div>{t.location}</div>
                              <div>{t.note}</div>
                              <div>{new Date(t.date).toLocaleString()}</div>
                            </div>
                          ))
                        ) : (
                          <p>No tracking updates yet.</p>
                        )}
                      </DialogDescription>

                      <DialogClose asChild>
                        <Button className="mt-4">Close</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedOrders;
