import { useEffect, useRef } from "react";

function MyCar({img,top,left,updateDimension})
{
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
        const computedStyle = window.getComputedStyle(inputRef.current);
      const data = {
            left: computedStyle.marginLeft,
            top: computedStyle.marginTop,
            width: computedStyle.width,
            height: computedStyle.height,
            name:img
        };
        updateDimension(data);
    }
    }, [top]);
    return (
        <div ref={inputRef} className="car" style={{backgroundImage:`url("assets/${img}")`,marginTop:`${top}vh`,marginLeft:`${left}%`}}>
          
        </div>
    );
}
export default MyCar;