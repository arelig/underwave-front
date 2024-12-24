'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@lib/AuthContext';
import Button from '@/components/material/CustomButton';

const ProfilePage = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleString()}</p>
      <Button onClick={logoutUser} color="red" className="mt-4">
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;
