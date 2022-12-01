import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

import SearchContainer from "lib/components/search/SearchContainer";
import { EVENT_TYPE_NAVIGATE } from "lib/constants/events";
import { useCategoryList } from "lib/services/publicapis/category";
import { trackEvent } from "lib/utils/trackEvent";

import type { HomePageProps } from "./types";

const Home = ({ categoryFallbackData }: HomePageProps) => {
  const handleClickAll = () => {
    trackEvent({
      eventName: "Home: click see complete list",
      eventData: { type: EVENT_TYPE_NAVIGATE },
    });
  };

  const { data } = useCategoryList(categoryFallbackData);

  const categories = React.useMemo(
    () => data?.categories ?? [],
    [data?.categories]
  );

  return (
    <Box mb={8} marginX="auto" maxWidth={1000}>
      <SearchContainer categories={categories} />

      <Box marginY={12}>
        <Link href="/all" passHref>
          <Button width="full" onClick={handleClickAll}>
            I want to see the complete list
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
