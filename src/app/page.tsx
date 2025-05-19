import APIListPage from '@/lib/pages/all';
import { fetchResources } from '@/lib/services/public-apis';

const AllAPIPage = async () => {
  const data = await fetchResources('resources');

  return <APIListPage data={data} />;
};

export default AllAPIPage;
