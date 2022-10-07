import { ChangeEvent, useState } from 'react';

import Cookies from 'js-cookie';
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { Layout } from '../components/layout';

export const ThemeChangerPage: React.FC = props => {
  console.log({ props });

  const [currentTheme, setCurrentTheme] = useState('dark');

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value;
    // console.log({ selectedTheme });
    setCurrentTheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme); // 5Mb capacidad total.
    Cookies.set('themeCookies', selectedTheme); // 4Kb capacidad total pero son enviadas en la request al server.
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel value={'light'} control={<Radio />} label={'Light'} />
              <FormControlLabel value={'dark'} control={<Radio />} label={'Dark'} />
              <FormControlLabel value={'custom'} control={<Radio />} label={'Custom'} />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // console.log(req);
  // const cookies = req.cookies;
  const { themeCookies = 'light' } = req.cookies;
  return {
    props: {
      theme: themeCookies,
    },
  };
};

export default ThemeChangerPage;
