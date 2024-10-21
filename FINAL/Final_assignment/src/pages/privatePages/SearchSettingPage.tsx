import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const SearchSettingPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Search Settings"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default SearchSettingPage;
