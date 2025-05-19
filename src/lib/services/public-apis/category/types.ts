export type CategoryListResponse = {
  count: number;
  entries: Array<CategoryEntry>;
};

type CategoryEntry = {
  name: string;
  slug: string;
};
