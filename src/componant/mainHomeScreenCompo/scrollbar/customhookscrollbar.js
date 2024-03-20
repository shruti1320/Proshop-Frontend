import { useEffect } from 'react';

function useScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         // Show scroll-to-top button when user scrolls down
//         // You can add your own logic for when to show/hide the button
//         document.getElementById('scrollToTopBtn').style.display = 'block';
//       } else {
//         // Hide scroll-to-top button when user scrolls to top
//         document.getElementById('scrollToTopBtn').style.display = 'none';
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

  return {
    scrollToTop,
  };
}

export default useScrollToTop;
