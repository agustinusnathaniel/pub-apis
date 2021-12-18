import { Box, Button, FormControl, Input, Skeleton } from "@chakra-ui/react";
import chunk from "lodash/chunk";
import Link from "next/link";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import ItemContainer from "components/item/ItemContainer";
import PageNavigationButtons, {
  PageNavigationButtonsProps,
} from "components/list/PageNavigationButtons";
import { useApiList } from "services/publicapis/list";

import { APIListPageProps } from "./types";

const ITEM_PER_PAGE = 24;

const APIListPage = ({ fallbackData }: APIListPageProps) => {
  const { data, isLoading } = useApiList(undefined, undefined, fallbackData);

  const sortedData = useMemo(() => {
    if (!data?.entries) {
      return [];
    }

    return data.entries.sort((a, b) => {
      if (a.API < b.API) {
        return -1;
      }
      if (a.API > b.API) {
        return 1;
      }
      return 0;
    });
  }, [data]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");

  const paginatedData = useMemo(() => {
    const filteredData = sortedData.filter((entry) => {
      if (!keyword) {
        return true;
      }

      return (
        entry.API.toLowerCase().indexOf(keyword) > -1 ||
        entry.Description.toLowerCase().indexOf(keyword) > -1
      );
    });

    return chunk(filteredData, ITEM_PER_PAGE);
  }, [keyword, sortedData]);

  const handleChangePage = useCallback(
    (type: "next" | "prev") => () => {
      const updatePageNumber =
        type === "next" ? currentPage + 1 : currentPage - 1;
      setCurrentPage(updatePageNumber);
      window.scrollTo(0, 0);
    },
    [currentPage]
  );

  const handleChangeKeyword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value.toLowerCase());
    },
    []
  );

  const pageNavigationButtonsProps: PageNavigationButtonsProps = useMemo(
    () => ({
      currentPage,
      handleChangePage,
      lastPage: paginatedData.length - 1,
    }),
    [currentPage, handleChangePage, paginatedData.length]
  );

  return (
    <Box>
      <Link href="/" passHref>
        <Button
          isFullWidth
          leftIcon={<AiOutlineArrowLeft />}
          size="lg"
          marginBottom={8}
        >
          back
        </Button>
      </Link>
      <Skeleton isLoaded={!isLoading} minHeight="80vh">
        <FormControl>
          <Input
            type="text"
            placeholder="quick search"
            size="lg"
            onChange={handleChangeKeyword}
          />
        </FormControl>
        <PageNavigationButtons {...pageNavigationButtonsProps} />
        {paginatedData[currentPage]?.length ? (
          <ItemContainer
            entries={paginatedData[currentPage]}
            useAccordion={false}
          />
        ) : null}
        <PageNavigationButtons {...pageNavigationButtonsProps} />
      </Skeleton>
    </Box>
  );
};

export default APIListPage;