import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const PDSessionPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="PD Session"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create PD Session"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default PDSessionPage;
