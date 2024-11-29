import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  console.log(pathname, "pathname")

  useEffect(() => {
    // console.log(pathname, "pathname");
    // console.log("Document scroll height:", document.documentElement.scrollHeight);
    // console.log("Body scroll height:", document.body.scrollHeight);
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]); // Runs whenever the route changes

  return null;
};

export default ScrollToTop;
