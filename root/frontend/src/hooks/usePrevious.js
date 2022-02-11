import { useEffect, useRef } from "react";

const usePrevious = (val) => {
  
  let ref = useRef(null);

  // updates val to current
  useEffect(() => {
    ref = val;
  }, [val]);

  // returns before useEffect call, prev val
  return ref;

}

export default usePrevious;