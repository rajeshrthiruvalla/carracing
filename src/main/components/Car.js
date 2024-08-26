
function MyCar({img,top,left})
{
   
    return (
        <div className="car" style={{backgroundImage:`url("assets/${img}")`,marginTop:`${top}vh`,marginLeft:`${left}%`}}>
          
        </div>
    );
}
export default MyCar;