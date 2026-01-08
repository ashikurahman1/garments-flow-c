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
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 lg:m-6">
      <div className="glass-card rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Approved Orders</h2>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-left">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Order ID</th>
                <th className="p-4 font-semibold text-foreground">User</th>
                <th className="p-4 font-semibold text-foreground">Product</th>
                <th className="p-4 font-semibold text-foreground">Qty</th>
                <th className="p-4 font-semibold text-foreground">Approved Date</th>
                <th className="p-4 font-semibold text-foreground">Tracking</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-card/30">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 text-xs font-mono text-muted-foreground">{order._id}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{order.buyerEmail}</td>
                  <td className="p-4 text-sm text-foreground">{order.productName}</td>
                  <td className="p-4 font-mono text-sm">{order.quantity}</td>
                  <td className="p-4 text-sm text-muted-foreground">{new Date(order.approvedAt).toLocaleDateString()}</td>

                  <td className="p-4 flex gap-2">
                    {/* Add Tracking Button */}
                    <Dialog open={openModal} onOpenChange={setOpenModal}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                          onClick={() => {
                            setSelected(order);
                            setOpenModal(true);
                          }}
                        >
                          <IconPlus size={16} className="mr-1" /> Add Tracking
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="glass-card border-white/20">
                        <DialogHeader>
                          <DialogTitle>Add Tracking Update</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 mt-2">
                          <div>
                            <Label className="mb-2 block">Status</Label>
                            <Select onValueChange={value => setTrackStatus(value)}>
                              <SelectTrigger className="bg-background/50 border-border">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "Cutting Completed",
                                  "Sewing Started",
                                  "Finishing",
                                  "QC Checked",
                                  "Packed",
                                  "Shipped",
                                  "Out for Delivery"
                                ].map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label className="mb-2 block">Location</Label>
                            <Input
                              value={location}
                              onChange={e => setLocation(e.target.value)}
                              placeholder="Factory/warehouse location"
                              className="bg-background/50 border-border"
                            />
                          </div>

                          <div>
                             <Label className="mb-2 block">Note</Label>
                             <Textarea
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="Optional details"
                                className="bg-background/50 border-border"
                             />
                          </div>

                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white mt-4 w-full"
                            onClick={handleAddTracking}
                          >
                            Save Tracking Update
                          </Button>
                        </div>

                        <DialogClose asChild>
                          <Button className="mt-2 w-full" variant="outline">Close</Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    {/* View Tracking Timeline */}
                    <Dialog open={openView} onOpenChange={setOpenView}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm"
                          onClick={() => {
                            setSelected(order);
                            setOpenView(true);
                          }}
                        >
                          <IconEye size={16} />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="glass-card border-white/20">
                        <DialogHeader>
                          <DialogTitle>Tracking Timeline</DialogTitle>
                        </DialogHeader>

                        <DialogDescription className="mt-4">
                            <div className="relative border-l-2 border-border ml-3 pl-4 space-y-6">
                            {selected?.tracking?.length > 0 ? (
                                selected.tracking.map((t, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background"></div>
                                    <div className="font-bold text-foreground">{t.status}</div>
                                    <div className="text-sm text-foreground/80">{t.location}</div>
                                    {t.note && <div className="text-xs text-muted-foreground italic mt-1">"{t.note}"</div>}
                                    <div className="text-xs text-muted-foreground mt-1">{new Date(t.date).toLocaleString()}</div>
                                </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground italic">No tracking updates yet.</p>
                            )}
                            </div>
                        </DialogDescription>

                        <DialogClose asChild>
                          <Button className="mt-4 w-full" variant="outline">Close</Button>
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
    </div>
  );
};

export default ApprovedOrders;
