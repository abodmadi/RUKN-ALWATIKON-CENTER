'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedPage({ children }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAllowed(true);
    } else {
      router.push('/sign-in'); 
    }
  }, []);


  if (!isAllowed) return <LoadingSpinner />;


  return children;
}