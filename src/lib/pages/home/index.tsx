'use client';

import Link from 'next/link';

import SearchContainer from '@/lib/components/search/SearchContainer';
import { Button } from '@/lib/components/ui/button';
import { EVENT_TYPE_NAVIGATE } from '@/lib/constants/events';
import type { HomePageProps } from '@/lib/pages/home/types';
import { trackEvent } from '@/lib/utils/trackEvent';

const Home = ({ categoryListData }: HomePageProps) => {
  const handleClickAll = () => {
    trackEvent({
      eventName: 'Home: click see complete list',
      eventData: { type: EVENT_TYPE_NAVIGATE },
    });
  };

  const categories = (categoryListData?.entries ?? []).map((item) => item.name);

  return (
    <div className="mx-auto mb-8 max-w-3xl">
      <SearchContainer categories={categories} />

      <div className="my-12">
        <Button asChild className="w-full" onClick={handleClickAll}>
          <Link href="/all" onClick={handleClickAll}>
            I want to see the complete list
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
