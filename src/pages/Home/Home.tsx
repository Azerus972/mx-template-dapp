import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { PageWrapper } from 'wrappers';

export const Home = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <PageWrapper>
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <h1 className='text-4xl font-bold mb-4'>Welcome on</h1>
        <p className='text-xl text-gray-600 text-center max-w-2xl'>
          Another Quizz
        </p>
      </div>
    </PageWrapper>
  );
};
