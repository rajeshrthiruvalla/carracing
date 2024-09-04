import { useEffect, useState } from "react";
import MyCar from "./components/MyCar";
import Car from "./components/Car";

function Home()
{
    const [distance,updateDistance]=useState(0);
    const [roadPos,updateRoadPos]=useState(0);
    const [carTop,updateCarTop]=useState(0);
    const [carTopGreen,updateCarTopGreen]=useState(-250);
    const [carTopBlue,updateCarTopBlue]=useState(-500);
    const [carTopPink,updateCarTopPink]=useState(-750);
    const [myCarDimension,updateMyCarDimension]=useState(null);
    const [greenCarDimension,updateGreenCarDimension]=useState(null);
    const [blueCarDimension,updateBlueCarDimension]=useState(null);
    const [pinkCarDimension,updatePinkCarDimension]=useState(null);
    const [fail,updateStatus]=useState(false);
    const [topScore,updateTopScore]=useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(!fail)
            {
                updateRoadPos((prevPosition) => prevPosition + 1);
                updateCarTop((prevPosition) =>{
                   let new_pos= prevPosition + 1;
                //    if(new_pos>100)
                //    {
                //     new_pos=0;
                //    }
                   return new_pos;
                } );

            }
        }, 50); // Adjust the time interval as needed

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [fail]);
    
    
    function storeLocalStorage(points)
    {
        localStorage.setItem("max_point", points);
    }

    function getLocalStorage()
    {
      let maxPoint=localStorage.getItem('max_point');
      if(maxPoint)
      {
        maxPoint= parseInt(maxPoint);
        if(!isNaN(maxPoint))
        {
            return maxPoint;
        }
      }
      return 0;
    }

    useEffect(function(){
        if(fail)
        {
            let points=getLocalStorage();
            if(carTop>points)
            {
               
              storeLocalStorage(carTop);
              if(points>0)
              {
                updateTopScore(true);
              }
            }
        }
    },[fail]);
    useEffect(()=>{
        if(!fail)
            {
        const stateChangeHandle=(old_top)=>{
            let new_top=old_top+1;

            if(old_top>100)
                {
                    new_top=getRandomNumber();
                }
                return new_top;
        }
        updateCarTopGreen(stateChangeHandle);
        updateCarTopBlue(stateChangeHandle);
        updateCarTopPink(stateChangeHandle);
    }
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
        return -1*(Math.floor(Math.random() * (500 - 250 + 1)) + 250);
    }

    function checkCollision() {
     

        const cars = [
            greenCarDimension,
            blueCarDimension,
            pinkCarDimension
        ];

        for (const car of cars) {
            if (isOverlapping(myCarDimension, car)) {
                updateStatus(true);
                break; // Exit loop after detecting collision
            }
        }
    }

    function isOverlapping(car1, car2) {
       let  x1a=parseInt(car1.left)+parseInt(car1.width)/4;
       let  x1b=parseInt(car1.left)+parseInt(car1.width)-parseInt(car1.width)/4;
       let x2a=parseInt(car2.left)+parseInt(car2.width)/4;
       let x2b=parseInt(car2.left)+parseInt(car2.width)-parseInt(car2.width)/4;
        if(((x1a<=x2a)&&(x2a<=x1b))||((x1a<=x2b)&&(x2b<=x1b)))
        {
            
            if(parseInt(car2.top)+(parseInt(car2.height)/4)>parseInt(car1.top))
            {
                return true;
            }
        }
    }

     useEffect(()=>{
        if(myCarDimension&&greenCarDimension&&blueCarDimension&&(!fail))
        {
        checkCollision();
        }
     },[myCarDimension,greenCarDimension,blueCarDimension,pinkCarDimension,distance])

    return (
        <>
        <div className="home" style={{backgroundImage:'url("assets/road.png")',backgroundRepeat:'repeat-y',backgroundPositionY:`${roadPos}px`}}>
            <div className="event-arrow-div">
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('left')}><img alt="left arrow" src="assets/left_arrow.png"/></a>
            <a href="#!" className="event-arrow-item" onClick={()=>arrowClickHandle('right')}><img alt="right arrow" src="assets/right_arrow.png"/></a>
            </div>
        </div>
        <div className="racing-div">
            <MyCar left={distance} updateDimension={updateMyCarDimension}/>
           <Car img="green_car.png" top={carTopGreen} left="0" updateDimension={updateGreenCarDimension}/>
           <Car img="blue_car.png" top={carTopBlue} left="33" updateDimension={updateBlueCarDimension}/>
            <Car img="pink_car.png" top={carTopPink} left="66" updateDimension={updatePinkCarDimension}/> 
        </div>
        <div className="points">{carTop}</div>
        {fail&&<div className="game-over">
            <h1>Game Over</h1>
            <p>Score : {carTop}</p>
           {(topScore)&&<span>New Top Score </span>} 
        </div>}
        </>
    );
}
export default Home;