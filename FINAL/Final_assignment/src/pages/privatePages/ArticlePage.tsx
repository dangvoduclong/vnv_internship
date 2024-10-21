import React from "react";
import Header from "../../components/header";
import useSearchHandler from "../../hooks/useSearchHandler";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

const ArticlePage: React.FC = () => {
  const { handleSearch } = useSearchHandler();

  const handleCreateForm = () => {
    console.log("Creating form...");
  };

  return (
    <div>
      <Header
        outletName="Article"
        onSearch={handleSearch}
        onCreate={handleCreateForm}
        buttonText="Create Article"
      />
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default ArticlePage;
