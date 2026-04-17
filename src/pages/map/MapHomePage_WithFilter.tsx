import { MapHomePage_SelectOption } from "@/components/filter/MapHomePage_SelectOption";
import { MapHomePage } from "@/pages/map/MapHomePage";
import { useUiStore } from "@/store/uiStore";

export function MapHomePage_WithFilter() {
  const isFilterOpen = useUiStore((state) => state.isFilterOpen);
  const setFilterOpen = useUiStore((state) => state.setFilterOpen);

  return (
    <>
      <MapHomePage />
      <MapHomePage_SelectOption open={isFilterOpen} onOpenChange={setFilterOpen} />
    </>
  );
}
