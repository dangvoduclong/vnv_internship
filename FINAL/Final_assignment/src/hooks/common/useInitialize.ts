import { useEffect } from "react";

export default function useInitialize(
  handler: () => void | (() => void),
  immediate: boolean = true
) {
  useEffect(() => {
    return immediate ? handler() : undefined;
  }, []);
}
