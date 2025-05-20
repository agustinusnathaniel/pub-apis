/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';

import { Button } from '@/lib/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/lib/components/ui/sheet';
import { EVENT_TYPE_CTA } from '@/lib/constants/events';
import { trackEvent } from '@/lib/utils/trackEvent';

import Badges from './Badges';

const APP_NAME = 'Public APIs';

type AppsType = {
  name: string;
  description?: string;
  icon: string;
  url: string;
};

const PROJECT_LIST_URL = `${process.env.NEXT_PUBLIC_PROJECTS_LIST_URL}`;

const AppMenu = () => {
  const [apps, setApps] = useState<Array<AppsType>>([]);

  const handleClickAppMenu = () => {
    trackEvent({
      eventName: 'Open App Menu',
      eventData: { type: EVENT_TYPE_CTA },
    });
  };

  useEffect(() => {
    fetch(`${PROJECT_LIST_URL}`)
      .then((res) => res.json())
      .then((result) => {
        setApps(result);
      });
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="app-menu"
          onClick={handleClickAppMenu}
          size="icon"
          variant="outline"
        >
          <BiMenu />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <h3 className="text-xs font-bold">More from sznm.dev</h3>
        </SheetHeader>

        <div>
          {apps
            .filter((app) => app.name !== APP_NAME)
            .map(({ name, icon, url, description }) => (
              <a
                className="hover:decoration-[none]"
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="my-4 flex items-center rounded-xl p-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <img src={icon} width={36} alt={name} />
                  <div className="ml-4">
                    <h4 className="text-sm font-bold">{name}</h4>
                    {description && <p className="text-xs">{description}</p>}
                  </div>
                </div>
              </a>
            ))}

          <div className="mt-8">
            <p>Public APIs</p>
            <Badges />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppMenu;
