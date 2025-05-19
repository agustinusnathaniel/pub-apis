import Script from 'next/script';

import { ThemeProvider } from '@/lib/components/theme-provider';
import { Toaster } from '@/lib/components/ui/toaster';
import { UMAMI_SRC, UMAMI_WEBSITE_ID } from '@/lib/constants/umami';
import Layout from '@/lib/layout';
import { fontSans } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';
import { cn } from '@/lib/styles/utils';

export { metadata, viewport } from '@/lib/constants/root_metadata';

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(fontSans.variable, 'font-sans')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>{children}</Layout>
          <Toaster />
        </ThemeProvider>

        {/* umami self-hosted analytics */}
        <Script
          async
          defer
          data-website-id={UMAMI_WEBSITE_ID}
          src={UMAMI_SRC}
        />
      </body>
    </html>
  );
};

export default RootLayout;
