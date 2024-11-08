import { useEffect } from "react";

export default function useInitialize(handler: () => void | (() => void)) {
  useEffect(() => {
    return handler();
  }, []);
}
