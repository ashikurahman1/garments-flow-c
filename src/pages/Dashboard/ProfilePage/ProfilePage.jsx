import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

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
      });
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Image too large',
        text: 'Max 2MB allowed.',
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
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Loading user data...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg m-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        {preview && (
          <img
            src={preview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-600">Full Name</p>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{userData?.email || user.email}</p>
        </div>

        <div>
          <p className="text-gray-600">Role</p>
          <p className="font-semibold">{userData?.role || 'Buyer'}</p>
        </div>

        <div>
          <p className="text-gray-600">Account Status</p>
          <p
            className={`font-semibold ${
              userData?.status === 'active' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {userData?.status || 'Active'}
          </p>
        </div>

        <div>
          <p className="text-gray-600">Profile Photo</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`mt-4 w-full p-2 rounded text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-800 hover:bg-amber-700'
          }`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
