import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <MainHeader />
      {children}
    </body>
  </html>
);

export default RootLayout;
