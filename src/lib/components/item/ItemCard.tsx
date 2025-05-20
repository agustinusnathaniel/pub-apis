import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { ImCopy } from 'react-icons/im';

import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import type { APIEntry } from '@/lib/services/publicapis/list/types';
import { toast } from 'sonner';

type APIDetailsProps = Omit<APIEntry, 'API' | 'Description' | 'Link'>;

const APIDetails = ({ Category, HTTPS, Cors, Auth }: APIDetailsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">{Category}</Badge>
      <Badge variant="secondary" className="items-center">
        <p className="mr-2">HTTPS :</p>
        {HTTPS ? (
          <AiFillCheckCircle color="green" />
        ) : (
          <AiFillCloseCircle color="red" />
        )}
      </Badge>
      <Badge variant="secondary">CORS : {Cors}</Badge>
      {Auth && <Badge variant="secondary">Auth : {Auth}</Badge>}
    </div>
  );
};

type ItemCardProps = {
  value: APIEntry;
};

const ItemCard = ({ value }: ItemCardProps) => {
  const {
    API: APIName,
    Description,
    Cors,
    HTTPS,
    Auth,
    Category,
    Link: APILink,
  } = value;

  const apiDetailsProps: APIDetailsProps = {
    Cors,
    HTTPS,
    Category,
    Auth,
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(APILink);
    toast(`"${APILink}" copied to clipboard!`);
  };

  return (
    <a
      className="group relative grid gap-4 rounded-3xl border-2 border-solid border-gray-200 p-4 decoration-[none] duration-300 ease-out hover:scale-[1.02] md:p-8 dark:border-gray-700"
      href={APILink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <h2 className="text-lg font-bold">{APIName}</h2>
        <p className="my-1 text-sm font-light text-gray-500">{Description}</p>
      </div>

      <APIDetails {...apiDetailsProps} />

      <Button
        className="absolute top-4 right-4 rounded-3xl md:top-6 md:right-6"
        aria-label="copy button"
        onClick={handleCopy}
        variant="secondary"
      >
        <ImCopy />
      </Button>
    </a>
  );
};

export default ItemCard;
