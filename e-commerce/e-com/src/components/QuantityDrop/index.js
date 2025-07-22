import { LuPlus } from "react-icons/lu";
import { HiMinus } from "react-icons/hi";
import { Button } from "@mui/material";
import { useState } from "react";
const QuantityDrop = () => {


  const [inputVal,setInputVal]=useState(1);

  const minus=()=>{
    if(inputVal>1){
      setInputVal(inputVal-1);
    }
    
  }

  const plus=()=>{
    setInputVal(inputVal+1);
  }
  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus}>
        <HiMinus />
      </Button>
      <input type="text" value={inputVal}/>
      <Button onClick={plus}>
        <LuPlus />
      </Button>
    </div>
  );
};

export default QuantityDrop;
