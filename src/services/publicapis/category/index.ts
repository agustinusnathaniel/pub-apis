import { publicApiFetcher, usePublicApiSWR } from "services/publicapis/utils";

import { CategoryResponse } from "./types";

const CATEGORY_RESOURCE_PATH = "/categories";

export const getCategoryList = () =>
  publicApiFetcher<CategoryResponse>(CATEGORY_RESOURCE_PATH);

export const useCategoryList = (fallbackData?: CategoryResponse) =>
  usePublicApiSWR<CategoryResponse>(
    CATEGORY_RESOURCE_PATH,
    undefined,
    fallbackData
  );
