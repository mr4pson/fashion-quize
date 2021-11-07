import { useEffect } from "react";

export function useOnClickOutside(
  itemsId: string,
  handler: (value: Event) => void
): void {
  useEffect(
    () => {
      const listener = (event: Event): void => {
        // Do nothing if clicking ref's element or descendent elements
        if (itemsId === (event.target as any).id) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Хук проверяет, содержит ли ref.current цель события event.target,
    // и если содержит выполняет handler.
    [itemsId, handler]
  );
}
