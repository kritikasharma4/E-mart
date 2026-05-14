import { HiMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";

const QuantityDrop = ({ value = 1, onChange, max = Infinity }) => (
  <div className="em-qty">
    <button className="em-qty-btn" onClick={() => onChange?.(Math.max(1, value - 1))}>
      <HiMinus />
    </button>
    <span className="em-qty-val">{value}</span>
    <button className="em-qty-btn" onClick={() => onChange?.(Math.min(max, value + 1))}>
      <LuPlus />
    </button>
  </div>
);

export default QuantityDrop;
