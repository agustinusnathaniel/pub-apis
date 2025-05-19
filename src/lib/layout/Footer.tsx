'use client';

import { EVENT_TYPE_LINK } from '@/lib/constants/events';
import { trackEvent } from '@/lib/utils/trackEvent';

const Footer = () => {
  const handleClickSite = () => {
    trackEvent({
      eventName: 'Click sznm.dev',
      eventData: { type: EVENT_TYPE_LINK },
    });
  };

  return (
    <footer className="flex w-full justify-center self-end">
      <div className="text-center">
        <p className="text-sm sm:text-base">
          {new Date().getFullYear()}
          {' | '}
          <a
            href="https://sznm.dev"
            onClick={handleClickSite}
            className="font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            sznm.dev
          </a>
        </p>

        <p className="text-xs sm:text-sm">
          Powered by https://publicapis.dev/ API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
