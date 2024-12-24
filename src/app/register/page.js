'use client';

import { useState } from 'react';
import { useAuth } from '@lib/AuthContext'; // Use the AuthContext for login
import Button from '@/components/material/CustomButton';
import Typography from '@/components/material/CustomTypography';
import { Input } from '@material-tailwind/react';
import Link from 'next/link';

const RegisterPage = () => {
  const { loginUser } = useAuth(); // Use the centralized login function
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      // Register the user
      const user = await registerUser(username, email, password);

      // Automatically log in the user after registration
      await loginUser(username, password);

      // Redirect handled in `loginUser` within AuthContext
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
        <Input
          id="username"
          label="Username"
          type="text"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center gap-1 font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-mt-px h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          Use at least 8 characters, one uppercase, one lowercase, and one number.
        </Typography>

        <Button type="submit" color="primary" className="w-full text-white" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link href="/login">
          <Button variant="text" className="bg-blue-500 text-white">
            Login
          </Button>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
