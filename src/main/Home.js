import { useEffect, useState } from "react";
import MyCar from "./components/MyCar";
import Car from "./components/Car";

function Home()
{
    const [distance,updateDistance]=useState(0);
    const [roadPos,updateRoadPos]=useState(0);
    const [carTop,updateCarTop]=useState(0);
    const [car_top_green,updateCarTopGreen]=useState(getRandomNumber());
    const [car_top_blue,updateCarTopBlue]=useState(getRandomNumber());
    const [car_top_pink,updateCarTopPink]=useState(getRandomNumber());
    let car_top_orange=getRandomNumber();
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRoadPos((prevPosition) => prevPosition + 1);
            updateCarTop((prevPosition) =>{
               let new_pos= prevPosition + 1;
               if(new_pos>100)
               {
                new_pos=0;
               }
               return new_pos;
            } );
        }, 50); // Adjust the time interval as needed

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    useEffect(()=>{
        updateCarTopGreen(function(old_top){
            let new_top=old_top+1;

            if(old_top>100)
                {
                    new_top=getRandomNumber();
                }
                return new_top;
        });
        updateCarTopBlue(function(old_top){
            let new_top=old_top+1;

            if(old_top>100)
                {
                    new_top=getRandomNumber();
                }
                return new_top;
        });
        updateCarTopPink(function(old_top){
            let new_top=old_top+1;

            if(old_top>100)
                {
                    new_top=getRandomNumber();
                }
                return new_top;
        });
        console.log(car_top_blue,carTop);
        console.log(car_top_green,carTop);
        // if(car_top_blue>100)
        // {
        //     car_top_blue=getRandomNumber();
        // }
        // if(car_top_pink>100)
        // {
        //     car_top_pink=getRandomNumber();
        // }
        // if(car_top_orange>100)
        // {
        //     car_top_orange=getRandomNumber();
        // }
    },[carTop]);
    const arrowClickHandle=(direction)=>{
        updateDistance((old_distance)=>{
            let new_distance=0;
            if(direction==='left')
                {
                   new_distance=old_distance-10;
                   if(new_distance<0)
                   {
                    new_distance=0;
                   }
                   
                }else{
                    new_distance=old_distance+10;
                    if(new_distance>70)
                    {
                        new_distance=70;
                    }
                }
                return new_distance;
        });
    }
    function getRandomNumber()
    {
        return -1*Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    }
    return (
        <>
        <div className="home" style={{backgroundImage:'url("assets/road.png")',backgroundRepeat:'repeat-y',backgroundPositionY:`${roadPos}px`}}>
            <div className="event-arrow-div">
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('left')}><img alt="left arrow" src="assets/left_arrow.png"/></a>
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('right')}><img alt="right arrow" src="assets/right_arrow.png"/></a>
            </div>
            <MyCar left={distance}/>
        </div>
        <div className="racing-div">
           <Car img="green_car.png" top={car_top_green} left="0"/>
           <Car img="blue_car.png" top={car_top_blue} left="33"/>
           <Car img="pink_car.png" top={car_top_pink} left="66"/>
           {/* <Car img="orange_car.png" top={car_top_pink}/> */}

        </div>
        </>
    );
}
export default Home;