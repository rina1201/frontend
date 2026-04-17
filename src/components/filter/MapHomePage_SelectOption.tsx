import { ChevronUp, Coffee, Flag, RotateCcw, UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  FILTER_TAG_SECTIONS,
  type FilterSection,
  useFilterStore,
} from "@/store/filterStore";

type MapHomePageSelectOptionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SECTION_STYLE_MAP: Record<FilterSection, string> = {
  맛집: "bg-[#FCE8D7]",
  카페: "bg-[#E6E8FF]",
  놀거리: "bg-[#FCE1E3]",
};

const SECTION_ICON_MAP = {
  맛집: UtensilsCrossed,
  카페: Coffee,
  놀거리: Flag,
} as const;

export function MapHomePage_SelectOption({
  open,
  onOpenChange,
}: MapHomePageSelectOptionProps) {
  const selectedTags = useFilterStore((state) => state.selectedTags);
  const toggleTag = useFilterStore((state) => state.toggleTag);
  const resetSelectedTags = useFilterStore((state) => state.resetSelectedTags);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-page transition-all duration-200",
        open ? "opacity-100" : "opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="w-full max-w-lg px-4 pt-[calc(max(1rem,env(safe-area-inset-top))+9rem)] md:max-w-3xl md:px-4 xl:max-w-lg xl:px-4">
        <section
          className={cn(
            "pointer-events-auto overflow-hidden rounded-[30px] border border-white/70 bg-white/95 shadow-[0_18px_40px_rgba(45,45,45,0.18)] backdrop-blur-sm transition-all duration-200",
            open ? "translate-y-0 scale-100" : "-translate-y-2 scale-[0.98]",
          )}
        >
          <div className="flex items-center justify-between px-5 py-3 text-sm">
            <p className="text-muted-foreground font-medium">세부 태그사항 선택</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground inline-flex items-center gap-1 text-sm font-medium"
            >
              <ChevronUp className="size-4" aria-hidden />
              접기
            </button>
          </div>

          <div className="space-y-3 px-4 pb-3">
            {FILTER_TAG_SECTIONS.map((section) => {
              const Icon = SECTION_ICON_MAP[section.key];

              return (
                <section
                  key={section.key}
                  className={cn("rounded-[22px] px-4 py-3", SECTION_STYLE_MAP[section.key])}
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#5A5A5A]">
                    <Icon className="size-4" aria-hidden />
                    <span>{section.title}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {section.tags.map((tag) => {
                      const selected = selectedTags.includes(tag.id);

                      return (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => toggleTag(tag.id)}
                          className={cn(
                            "rounded-full border bg-white px-3 py-1.5 text-sm font-medium text-[#626262] transition-colors",
                            selected
                              ? "border-brand-coral bg-brand-coral-soft text-brand-coral"
                              : "border-black/8 hover:border-brand-coral/40",
                          )}
                          aria-pressed={selected}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="flex justify-end border-t border-black/5 px-4 py-3">
            <button
              type="button"
              onClick={resetSelectedTags}
              className="text-muted-foreground inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              초기화
              <RotateCcw className="size-4" aria-hidden />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
