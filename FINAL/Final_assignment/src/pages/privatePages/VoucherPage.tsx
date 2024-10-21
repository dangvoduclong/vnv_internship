import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";

const VoucherPage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Voucher"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Voucher"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default VoucherPage;
