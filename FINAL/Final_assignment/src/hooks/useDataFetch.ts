import { useEffect, useState } from "react";
import { fetchData } from "../utils/axiosConfig";

// Định nghĩa interface cho ApiResponse
interface ApiResponse<T> {
  message: string;
  data: T[];
  metadata: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const useDataFetch = <T>(
  endpoint: string,
  page: number,
  rowsPerPage: number,
  searchTerm: string,
  transformData: (data: T[]) => any[] = (data) => data // Hàm chuyển đổi dữ liệu tùy chỉnh
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getData = async () => {
    setLoading(true);
    try {
      const response: ApiResponse<T> = await fetchData(endpoint, {
        page,
        limit: rowsPerPage,
        search: searchTerm || undefined,
      });

      setData(transformData(response.data)); // Sử dụng hàm chuyển đổi dữ liệu
      setTotalPages(response.metadata.totalPages);
      setTotalCount(response.metadata.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, rowsPerPage, searchTerm]);

  return { data, loading, error, totalPages, totalCount };
};

export default useDataFetch;
