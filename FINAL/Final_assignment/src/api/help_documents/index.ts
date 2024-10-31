import { fetchData } from "../../utils/axiosConfig";

const BASE_URL = "/help-documents";

export const getHelpDocuments = (page = 1, limit = 25, sort = "-createdAt") => {
  return fetchData(`${BASE_URL}`, { page, limit, sort });
};
