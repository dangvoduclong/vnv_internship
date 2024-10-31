import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../utils/axiosConfig";
import debounce from "lodash.debounce";

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

const useDataFetch = <T>({
  endpoint,
  page,
  rowsPerPage,
  params = {},
  searchTerm,
  transformData = (data: T[]) => data,
}: {
  endpoint: string;
  page: number;
  rowsPerPage: number;
  params?: Record<string, any>;
  searchTerm?: string;
  transformData?: (data: T[]) => any[];
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getData = async () => {
    setLoading(true);
    console.log(
      "Fetching data:",
      endpoint,
      page,
      rowsPerPage,
      params,
      searchTerm
    );
  };

  const refetch = useCallback(() => {
    getData();
  }, [endpoint, page, rowsPerPage, searchTerm]);

  useEffect(() => {
    const handler = debounce(() => {
      getData();
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [page, rowsPerPage, searchTerm]);

  return { data, loading, error, totalPages, totalCount, refetch };
};

export default useDataFetch;
