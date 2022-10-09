import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { darkTheme, customTheme, lightTheme } from '../themes';
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const cookieTheme = Cookies.get('theme') || 'light'; // Error: Warning: Prop `className` did not match. Server: ...

  console.log({cookieTheme});

  const currentTheme: Theme = cookieTheme === 'light'
    ? lightTheme
    : cookieTheme === 'dark'
      ? darkTheme
      : customTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' };
//   const validThemes = ['light', 'dark', 'custom'];
//   // console.log('getInitialProps:', cookies);
//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   };
// };

export default MyApp;
