/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import pickBy from 'lodash/pickBy';
import { useForm } from 'react-hook-form';
import { FaFilter } from 'react-icons/fa';

import ItemContainer from '@/lib/components/item/ItemContainer';
import { INITIAL_VALUES } from '@/lib/components/search/constants';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { Checkbox } from '@/lib/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/components/ui/select';
import { Skeleton } from '@/lib/components/ui/skeleton';
import { useToast } from '@/lib/components/ui/use-toast';
import type { SearchForm } from '@/lib/models/searchForm';
import { useApiList } from '@/lib/services/publicapis/list/hooks';

import type { SearchContainerProps } from './types';

const SearchContainer = ({ categories }: SearchContainerProps) => {
  const { toast } = useToast();

  const {
    data: searchResult,
    isMutating: isLoadingSearchResult,
    trigger: searchAPI,
    reset: resetList,
  } = useApiList();

  const form = useForm<SearchForm>({
    defaultValues: INITIAL_VALUES,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { isValid, isDirty },
  } = form;

  const title = watch('queryParams.title');
  const searchButtonDisabled = !isDirty || !isValid || !title;

  const [description, category, https] = watch([
    'queryParams.description',
    'queryParams.category',
    'queryParams.https',
  ]);

  const processSearch = async (values: SearchForm) => {
    const queries = pickBy(values.queryParams);
    await searchAPI(queries).catch(() => {
      toast({
        title: 'Error',
        description:
          'Error fetching data. Check your internet connection and try to refresh the page.',
      });
    });
  };

  const handleReset = () => {
    reset(INITIAL_VALUES);
    resetList();
  };
  const handleSearch = handleSubmit(processSearch);

  return (
    <Form {...form}>
      <div className="mb-4 flex flex-col">
        <div className="flex gap-2">
          <Input
            {...register('queryParams.title')}
            type="text"
            placeholder="search API name"
            className="h-12 rounded-3xl font-semibold"
          />

          <Popover>
            <PopoverTrigger>
              <Button size="icon" aria-label="filter search">
                <FaFilter />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <h4 className="font-bold">Filter</h4>
              <div>
                <div className="flex flex-col gap-2">
                  <Input
                    {...register('queryParams.description')}
                    className="rounded-lg"
                    type="text"
                    placeholder="search API description"
                  />

                  <FormField
                    control={control}
                    name="queryParams.category"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category ..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map((categoryItem: string) => (
                              <SelectItem
                                value={categoryItem}
                                key={categoryItem}
                              >
                                {categoryItem}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center">
                    <FormField
                      control={control}
                      name="queryParams.https"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Support HTTPs</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-2 flex h-8 gap-2">
          {description ? <Badge>{description}</Badge> : null}
          {category ? <Badge className="bg-cyan-500">{category}</Badge> : null}
          {https ? <Badge className="bg-teal-500">HTTPs</Badge> : null}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          disabled={searchButtonDisabled}
          className="col-span-2 w-full"
          onClick={handleSearch}
        >
          {isLoadingSearchResult ? <ReloadIcon /> : null}
          Search
        </Button>
        <Button disabled={!isDirty} className="w-full" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {isLoadingSearchResult ? (
        <Skeleton className="my-4" />
      ) : (
        <>
          {searchResult?.entries ? (
            <ItemContainer
              entries={searchResult.entries}
              className="grid-cols-1 md:grid-cols-1 xl:grid-cols-1"
            />
          ) : null}
          {searchResult?.entries?.length === 0 ? (
            <p className="text-cneter">Not Found</p>
          ) : null}
        </>
      )}
    </Form>
  );
};

export default SearchContainer;
