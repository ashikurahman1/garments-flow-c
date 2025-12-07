import { useEffect } from 'react';

const usePageTitle = title => {
  useEffect(() => {
    document.title = title ? `${title} | Garments Flow` : 'Garments Flow';
  }, [title]);
};

export default usePageTitle;
