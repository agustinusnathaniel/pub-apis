import { TempClose } from '@/lib/pages/temp';
import { fetchResources } from '@/lib/services/public-apis';

const HomePage = async () => {
  // const categoryData = await getCategoryList();

  const categories = await fetchResources('categories');
  console.info({ categories });

  // return <Home />;
  return <TempClose />;
};

export default HomePage;
