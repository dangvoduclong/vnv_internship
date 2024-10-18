import React from "react";
import Header from "../../components/header";

const AdminManagement: React.FC = () => {
  const handleSearch = (term: string) => {
    console.log("Searching for:", term);
  };

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="My Outlet"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default AdminManagement;
