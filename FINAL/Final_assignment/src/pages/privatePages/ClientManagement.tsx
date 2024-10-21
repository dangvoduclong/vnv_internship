import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const ClientManagement: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  return (
    <div>
      <Header
        outletName="Account / Client Management"
        onSearch={handleSearch}
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default ClientManagement;
