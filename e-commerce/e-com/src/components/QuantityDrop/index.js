import { HiMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";

const QuantityDrop = ({ qty = 1, onChange }) => (
  <div className="em-qty">
    <button className="em-qty-btn" onClick={() => onChange?.(qty - 1)}>
      <HiMinus />
    </button>
    <span className="em-qty-val">{qty}</span>
    <button className="em-qty-btn" onClick={() => onChange?.(qty + 1)}>
      <LuPlus />
    </button>
  </div>
);

export default QuantityDrop;
