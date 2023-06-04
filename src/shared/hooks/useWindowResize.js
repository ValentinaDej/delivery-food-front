import { useEffect, useCallback, useState } from 'react';

const useWindowResize = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 480);

  const handleWindowResize = useCallback(() => {
    setIsDesktop(window.innerWidth > 480);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return isDesktop;
};

export default useWindowResize;
