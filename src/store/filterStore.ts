import { create } from "zustand";

export type FilterSection = "맛집" | "카페" | "놀거리";

export type FilterTagItem = {
  id: string;
  label: string;
};

export type FilterTagSection = {
  key: FilterSection;
  title: FilterSection;
  tags: FilterTagItem[];
};

export const FILTER_TAG_SECTIONS: FilterTagSection[] = [
  {
    key: "맛집",
    title: "맛집",
    tags: [
      { id: "맛집-한식", label: "한식" },
      { id: "맛집-중식", label: "중식" },
      { id: "맛집-일식", label: "일식" },
      { id: "맛집-양식", label: "양식" },
      { id: "맛집-분식", label: "분식" },
      { id: "맛집-아시아식", label: "아시아식" },
      { id: "맛집-술집", label: "술집" },
      { id: "맛집-기타", label: "기타" },
    ],
  },
  {
    key: "카페",
    title: "카페",
    tags: [{ id: "카페-제과, 베이커리", label: "제과, 베이커리" }],
  },
  {
    key: "놀거리",
    title: "놀거리",
    tags: [
      { id: "놀거리-테마파크", label: "테마파크" },
      { id: "놀거리-보드카페", label: "보드카페" },
      { id: "놀거리-만화카페", label: "만화카페" },
      { id: "놀거리-문화,예술", label: "문화,예술" },
      { id: "놀거리-방탈출카페", label: "방탈출카페" },
      { id: "놀거리-스포츠", label: "스포츠" },
      { id: "놀거리-찜질방", label: "찜질방" },
      { id: "놀거리-공원", label: "공원" },
      { id: "놀거리-생활용품점", label: "생활용품점" },
      { id: "놀거리-아쿠아리움", label: "아쿠아리움" },
      { id: "놀거리-기타", label: "기타" },
    ],
  },
];

type FilterState = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tagId: string) => void;
  resetSelectedTags: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  toggleTag: (tagId) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tagId)
        ? state.selectedTags.filter((item) => item !== tagId)
        : [...state.selectedTags, tagId],
    })),
  resetSelectedTags: () => set({ selectedTags: [] }),
}));
