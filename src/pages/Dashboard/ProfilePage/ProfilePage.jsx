import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [displayName, setDisplayName] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data from backend
  const { data: userData, isLoading } = useQuery({
    queryKey: ['userProfile', user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data.user;
    },
    enabled: !!user?.email,
  });

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setPreview(
        userData.photoURL || 'https://i.ibb.co/hRjGggrx/1000140164.jpg'
      );
    }
  }, [userData]);

  // Handle image selection with validation
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Please select an image.',
        confirmButtonColor: '#0ea5e9',
      });
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Image too large',
        text: 'Max 2MB allowed.',
        confirmButtonColor: '#0ea5e9',
      });
      return;
    }

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async file => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', import.meta.env.VITE_IMGBB_API);

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) return data.data.url;
    throw new Error('Image upload failed');
  };

  // Handle profile update
  const handleUpdate = async () => {
    try {
      setLoading(true);
      let photoURL;

      if (photoFile) {
        photoURL = await uploadImageToImgBB(photoFile);
      }

      const { data } = await axiosSecure.patch(
        `/users/${user.email}/update-profile`,
        {
          displayName,
          photoURL, // only URL sent
        }
      );

      if (!data.success)
        throw new Error(data.message || 'Failed to update profile');

      // Update Firebase profile
      await updateUserProfile({
        displayName,
        photoURL: data.photoURL || preview,
      });

      // Refresh react-query
      queryClient.invalidateQueries({ queryKey: ['userProfile', user.email] });

      // Update local state
      setDisplayName(data.user.displayName || displayName);
      setPreview(data.user.photoURL || preview);
      setPhotoFile(null);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Something went wrong!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        confirmButtonColor: '#0ea5e9',
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center p-6">
      <div className="glass-card p-8 rounded-2xl w-full max-w-lg border border-white/20 relative overflow-hidden">
        {/* Decorative Background Blur */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
        
        <h2 className="text-3xl font-display font-bold mb-6 text-center text-gradient">My Profile</h2>
  
        <div className="flex flex-col items-center gap-6 mb-8">
          {preview ? (
            <div className="relative group">
               <img
                src={preview}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-semibold">Change</span>
              </div>
               <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
            </div>
            
          ) : (
            <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-lg">
                <span className="text-4xl">👤</span>
            </div>
          )}
        </div>
  
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-semibold text-muted-foreground uppercase mb-2 block">Full Name</label>
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-background/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Enter your name"
            />
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-semibold text-muted-foreground uppercase mb-1 block">Email</label>
                <div className="bg-muted/50 px-4 py-3 rounded-xl border border-border text-foreground font-medium truncate" title={userData?.email || user.email}>
                    {userData?.email || user.email}
                </div>
            </div>
            <div>
                <label className="text-sm font-semibold text-muted-foreground uppercase mb-1 block">Role</label>
                 <div className="bg-muted/50 px-4 py-3 rounded-xl border border-border text-foreground font-medium capitalize">
                    {userData?.role || 'Buyer'}
                </div>
            </div>
          </div>
  
          <div>
            <label className="text-sm font-semibold text-muted-foreground uppercase mb-1 block">Account Status</label>
            <div className={`px-4 py-3 rounded-xl border border-border font-semibold flex items-center gap-2 ${
                userData?.status === 'active' 
                ? 'bg-green-500/10 text-green-600 border-green-200' 
                : 'bg-red-500/10 text-red-600 border-red-200'
              }`}>
              <div className={`w-2 h-2 rounded-full ${userData?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {userData?.status || 'Active'}
            </div>
          </div>
  
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`btn-premium mt-4 w-full py-3.5 rounded-xl font-semibold text-primary-foreground shadow-lg flex items-center justify-center gap-2 ${
              loading
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 shadow-primary/20'
            }`}
          >
            {loading ? (
                <>
                 <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                 Updating...
                </>
            ) : (
                'Update Profile'
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
