'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@lib/AuthContext';
import Button from '@/components/material/CustomButton';
import { Input } from '@material-tailwind/react';
import Link from 'next/link';

const LoginPage = () => {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(username, password);
      router.push('/profile'); // Redirect to profile after successful login
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
        <Input
          id="username"
          label="Username"
          type="text"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" color="primary" className="w-full text-white">
          Login
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link href="/register">
          <Button variant="text" className="bg-blue-500 text-white">
            Register
          </Button>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
