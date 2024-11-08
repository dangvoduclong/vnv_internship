import { useState } from "react";
import useInitialize from "./useInitialize";

export default function useApi<TData, TArgs extends unknown[]>(
  handler: (...args: TArgs) => Promise<TData>,
  immediate: boolean = true,
  defaultArgs?: Partial<TArgs>
) {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const act = async (...args: TArgs) => {
    setLoading(true);
    setError(undefined);
    const mergedArgs = (
      defaultArgs ? [...defaultArgs, ...args] : args
    ) as TArgs;

    try {
      const result = await handler(...mergedArgs);
      setData(result);
      return { data: result };
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("An unknown error occurred");
      setError(error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  useInitialize(() => {
    if (immediate) {
      act(...(defaultArgs as TArgs));
    }
  });

  return {
    data,
    loading,
    error,
    act,
  };
}
