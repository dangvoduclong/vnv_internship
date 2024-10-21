import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const CategoryPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Category"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Category"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default CategoryPage;
