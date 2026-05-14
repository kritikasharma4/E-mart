import { LuPlus } from "react-icons/lu";
import { HiMinus } from "react-icons/hi";
import { Button } from "@mui/material";

const QuantityDrop = ({ qty = 1, onChange }) => {
  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={() => onChange?.(qty - 1)}>
        <HiMinus />
      </Button>
      <span className="qty">{qty}</span>
      <Button onClick={() => onChange?.(qty + 1)}>
        <LuPlus />
      </Button>
    </div>
  );
};

export default QuantityDrop;
