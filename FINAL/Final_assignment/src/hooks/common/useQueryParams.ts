import debounce from "lodash.debounce";
import queryString from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface PaginationProps {
  page: number;
  limit: number;
}

export interface QueryParamsProps extends PaginationProps {
  search?: string;
  sort?: string;
}
const QUERY_DEFAULT = {
  page: 1,
  limit: 25,
};

const useQueryParams = (queryDefaults: QueryParamsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const queryParams: QueryParamsProps = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...queryDefaults,
      ...params,
    };
  }, [location.search, queryDefaults]);

  useEffect(() => {
    navigate(
      {
        pathname: location.pathname,
        search: queryString.stringify(queryParams),
      },
      { replace: true }
    );

    setSearchQuery(queryParams.search || "");
  }, [location.pathname, navigate, queryParams]);

  const handleChangePageIndex = (value: number) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({
        ...queryParams,
        page: value,
      }),
    });
  };

  const handleChangeLimit = (value: number) => {
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({
        ...queryParams,
        page: QUERY_DEFAULT.page,
        limit: value,
      }),
    });
  };

  const handleDebouncedSearch = useRef(
    debounce((searchValue: string, newQueries: QueryParamsProps) => {
      navigate({
        pathname: location.pathname,
        search: queryString.stringify({
          ...newQueries,
          search: searchValue ? searchValue : undefined,
          page: QUERY_DEFAULT.page,
        }),
      });
    }, 500)
  ).current;

  const handleSearch = (searchQuery: string) => {
    setSearchQuery(searchQuery);
    handleDebouncedSearch(searchQuery, queryParams);
  };

  const handleRequestSort = (property: string) => {
    let sortOrder = queryParams.sort === property ? `-${property}` : property;
    if (queryParams.sort === `-${property}`) {
      sortOrder = property;
    }
    navigate({
      pathname: location.pathname,
      search: queryString.stringify({
        ...queryParams,
        sort: sortOrder,
        page: QUERY_DEFAULT.page,
      }),
    });
  };

  return {
    searchQuery,
    queryParams,
    handleSearch,
    handleChangePageIndex,
    handleChangeLimit,
    handleRequestSort,
  };
};

export default useQueryParams;
