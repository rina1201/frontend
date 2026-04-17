import { memo, useEffect, useMemo, useState } from "react";

import { SearchField } from "@/components/common/SearchField";
import type { MapPlaceCategory, SavedPlace } from "@/shared/types/map-home";
import { useFilterStore } from "@/store/filterStore";
import { useUiStore } from "@/store/uiStore";

import { CategoryChips } from "./CategoryChips";

export type MapSearchOverlayProps = {
  places: SavedPlace[];
  categories: MapPlaceCategory[];
  placeholder: string;
  initialCategories?: MapPlaceCategory[];
  onFilteredPlacesChange: (places: SavedPlace[]) => void;
};

export const MapSearchOverlay = memo(function MapSearchOverlay({
  places,
  categories,
  placeholder,
  initialCategories = [],
  onFilteredPlacesChange,
}: MapSearchOverlayProps) {
  const [keyword, setKeyword] = useState("");
  const selectedTags = useFilterStore((state) => state.selectedTags);
  const setFilterOpen = useUiStore((state) => state.setFilterOpen);
  const [selectedCategories, setSelectedCategories] = useState<MapPlaceCategory[]>(
    () => initialCategories.filter((category) => category !== "기타"),
  );
  const isEtcActive = selectedTags.length > 0;
  const selectedCategoriesWithEtc = useMemo<MapPlaceCategory[]>(
    () => (isEtcActive ? [...selectedCategories, "기타"] : selectedCategories),
    [isEtcActive, selectedCategories],
  );
  const effectiveSelectedCategories = useMemo(
    () => new Set(selectedCategoriesWithEtc),
    [selectedCategoriesWithEtc],
  );

  const filteredPlaces = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const hasCategoryFilter = effectiveSelectedCategories.size > 0;

    return places.filter((place) => {
      if (hasCategoryFilter && !effectiveSelectedCategories.has(place.category)) return false;
      if (!normalizedKeyword) return true;

      const searchable = `${place.name} ${place.address}`.toLowerCase();
      return searchable.includes(normalizedKeyword);
    });
  }, [effectiveSelectedCategories, keyword, places]);

  useEffect(() => {
    onFilteredPlacesChange(filteredPlaces);
  }, [filteredPlaces, onFilteredPlacesChange]);

  const handleCategoryToggle = (category: MapPlaceCategory) => {
    if (category === "기타") {
      setFilterOpen(true);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  return (
    <div className="pointer-events-auto space-y-2.5">
      <SearchField
        name="map-search"
        value={keyword}
        placeholder={placeholder}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <CategoryChips
        categories={categories}
        selectedCategories={selectedCategoriesWithEtc}
        onToggleCategory={handleCategoryToggle}
      />
    </div>
  );
});
