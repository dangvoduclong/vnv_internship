import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const HelpPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Help Documents"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Help-Documents"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default HelpPage;
