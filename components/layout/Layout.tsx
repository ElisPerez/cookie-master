import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
  children: React.ReactNode; // Tips: Colocar un tipo de dato equivocado para que te muestre error con el tipo de dato correcto 😜
}

export const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <Head>{/* Meta tags */}</Head>
      <nav>{<Navbar />}</nav>
      <main style={{padding: '20px 50px'}}>{children}</main>
    </>
  );
};
