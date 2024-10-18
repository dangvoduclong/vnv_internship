import React from "react";
import { TextField, Button } from "@mui/material";

interface HeaderProps {
  outletName: string;
  onSearch: (searchTerm: string) => void;
  onCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ outletName, onSearch, onCreate }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <div className="text-lg font-bold">{outletName}</div>

      <form onSubmit={handleSearchSubmit} className="flex-grow mx-4">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      <Button variant="contained" color="primary" onClick={onCreate}>
        Create Form
      </Button>
    </header>
  );
};

export default Header;
