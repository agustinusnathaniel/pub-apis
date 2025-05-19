'use client';

import chunk from 'lodash/chunk';
import debounce from 'lodash/debounce';
import type { ChangeEvent } from 'react';
import React from 'react';

import ItemContainer from '@/lib/components/item/ItemContainer';
import type { PageNavigationButtonsProps } from '@/lib/components/list/PageNavigationButtons';
import PageNavigationButtons from '@/lib/components/list/PageNavigationButtons';
import { Input } from '@/lib/components/ui/input';

import type { APIListPageProps } from './types';

const ITEM_PER_PAGE = 24;

const APIListPage = ({ data }: APIListPageProps) => {
  const sortedData = React.useMemo(() => {
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

  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [keyword, setKeyword] = React.useState<string>('');

  const paginatedData = React.useMemo(() => {
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

  const handleChangePage = React.useCallback(
    (type: 'next' | 'prev') => () => {
      const updatePageNumber =
        type === 'next' ? currentPage + 1 : currentPage - 1;
      setCurrentPage(updatePageNumber);
      window.scrollTo(0, 0);
    },
    [currentPage]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeKeyword = React.useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value.toLowerCase());
      if (currentPage !== 0) {
        setCurrentPage(0);
      }
    }, 200),
    [currentPage]
  );

  const pageNavigationButtonsProps: PageNavigationButtonsProps = React.useMemo(
    () => ({
      currentPage,
      handleChangePage,
      lastPage: paginatedData.length - 1,
    }),
    [currentPage, handleChangePage, paginatedData.length]
  );

  return (
    <>
      {/* <Button asChild className="mb-8">
        <Link href="/">
          <AiOutlineArrowLeft />
          back
        </Link>
      </Button> */}

      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          type="text"
          placeholder="quick search"
          className="h-12 flex-[60%]"
          onChange={handleChangeKeyword}
        />
        <PageNavigationButtons {...pageNavigationButtonsProps} />
      </div>
      {paginatedData[currentPage]?.length ? (
        <ItemContainer entries={paginatedData[currentPage]} />
      ) : null}
      <div className="flex flex-col md:items-end md:justify-end">
        <PageNavigationButtons {...pageNavigationButtonsProps} />
      </div>
    </>
  );
};

export default APIListPage;
