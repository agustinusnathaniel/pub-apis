import type { APIEntry } from '@/lib/services/publicapis/list/types';
import { cn } from '@/lib/styles/utils';

import ItemCard from './ItemCard';

type ItemContainerProps = {
  entries: Array<APIEntry>;
  className?: string;
};

const ItemContainer = ({ entries, className }: ItemContainerProps) => {
  return (
    <div
      className={cn(
        'my-4 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3',
        className,
      )}
    >
      {entries.map((entry) => (
        <ItemCard value={entry} key={`${entry.API}-${entry.Link}`} />
      ))}
    </div>
  );
};

export default ItemContainer;
