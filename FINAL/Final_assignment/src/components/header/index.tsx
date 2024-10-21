import React from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  outletName: string;
  onSearch: (searchTerm: string) => void;
  onCreate?: () => void;
  buttonText?: string;
}

const Header: React.FC<HeaderProps> = ({
  outletName,
  onSearch,
  onCreate,
  buttonText,
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="flex flex-direction-row p-2 bg-white border-b-2">
      <div className="text-base hover:underline">{outletName}</div>

      <div className="flex-grow mx-4 flex justify-center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {onCreate && buttonText && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "purple",
            color: "white",
            fontWeight: "bold",
            padding: "4px 16px",
            fontSize: "0.85rem",
            textTransform: "none",
          }}
          onClick={onCreate}
        >
          {buttonText}
        </Button>
      )}
    </header>
  );
};

export default Header;
