import { useLocation } from "react-router-dom";

const useSearchHandler = () => {
  const location = useLocation();

  const searchHandlers: Record<string, (term: string) => void> = {
    "/account/admins": (term: string) => {
      console.log("Searching admins for:", term);
      // Logic tìm kiếm cho trang Admins
    },
    "/account/doulas": (term: string) => {
      console.log("Searching doulas for:", term);
      // Logic tìm kiếm cho trang Doulas
    },
    "/account/client": (term: string) => {
      console.log("Searching clients for:", term);
      // Logic tìm kiếm cho trang Clients
    },
    "/article": (term: string) => {
      console.log("Searching articles for:", term);
      // Logic tìm kiếm cho trang Articles
    },
    "/pd-sessions": (term: string) => {
      console.log("Searching PD sessions for:", term);
      // Logic tìm kiếm cho trang PD Sessions
    },
    "/categories": (term: string) => {
      console.log("Searching categories for:", term);
      // Logic tìm kiếm cho trang Categories
    },
    "/voucher": (term: string) => {
      console.log("Searching vouchers for:", term);
      // Logic tìm kiếm cho trang Vouchers
    },
    "/help-documents": (term: string) => {
      console.log("Searching help documents for:", term);
      // Logic tìm kiếm cho trang Help Documents
    },
    "/search-settings": (term: string) => {
      console.log("Searching search settings for:", term);
      // Logic tìm kiếm cho trang Search Settings
    },
  };

  const handleSearch = (term: string) => {
    const searchHandler = searchHandlers[location.pathname];
    if (searchHandler) {
      searchHandler(term);
    }
  };

  return { handleSearch };
};

export default useSearchHandler;
