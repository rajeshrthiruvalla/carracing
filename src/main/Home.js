import { useState } from "react";
import MyCar from "./components/MyCar";

function Home()
{
    const [distance,updateDistance]=useState(0);
    const arrowClickHandle=(direction)=>{
        updateDistance((old_distance)=>{
            if(direction==='left')
                {
                   old_distance=-10;
                   if(old_distance<0)
                   {
                    old_distance=0;
                   }
                   
                }else{
                    old_distance=+10;
                    if(old_distance>70)
                    {
                        old_distance=70;
                    }
                }
                return old_distance;
        });
    }
    return (
        <div className="home" style={{backgroundImage:'url("assets/road.png")'}}>
            <div className="event-arrow-div">
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('left')}><img alt="left arrow" src="assets/left_arrow.png"/></a>
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('right')}><img alt="right arrow" src="assets/right_arrow.png"/></a>
            </div>
            <MyCar left={distance}/>
        </div>
    );
}
export default Home;