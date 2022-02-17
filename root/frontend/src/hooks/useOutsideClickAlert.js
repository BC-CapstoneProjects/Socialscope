import React, {useRef, useEffect} from 'react';

function useOutsideClickAlert(ref, act) {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log('outside click');
        act();
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [ref]);
}

export default useOutsideClickAlert;