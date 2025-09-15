import Button from "@mui/material/Button";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="headerSearch">
      <input type="text" placeholder="Search for products..." />
      <Button className="searchBtn">
        <FaSearch />
      </Button>
    </div>
  );
};

export default SearchBox;
