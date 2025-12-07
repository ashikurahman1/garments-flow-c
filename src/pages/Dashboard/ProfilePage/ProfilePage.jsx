import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg m-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-600">Full Name</p>
          <p className="font-semibold">Manager Name</p>
        </div>

        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">manager@mail.com</p>
        </div>

        <div>
          <p className="text-gray-600">Role</p>
          <p className="font-semibold">Manager</p>
        </div>

        <div>
          <p className="text-gray-600">Account Status</p>
          <p className="font-semibold text-green-600">Active</p>
        </div>

        <Button className="mt-4 bg-amber-800 hover:bg-amber-700">Logout</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
