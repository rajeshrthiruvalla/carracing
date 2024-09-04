import { useEffect, useRef } from "react";

function MyCar({left,updateDimension})
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
              name:'mycar'
          };
          updateDimension(data);
        }
      }, [left]);
    return (
        <div className="my-car" style={{backgroundImage:'url("assets/mycar.png")',marginLeft:`${left}%`}} ref={inputRef}>
          
        </div>
    );
}
export default MyCar;