import { ChangeEvent, useState } from 'react';
import { GetServerSideProps } from 'next';

import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import { Layout } from '../components/layout';

interface Props {
  theme: string;
}

export const ThemeChangerPage: React.FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value;
    // console.log({ selectedTheme });
    setCurrentTheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme); // 5Mb capacidad total.
    Cookies.set('theme', selectedTheme); // 4Kb capacidad total pero son enviadas en la request al server.
  };

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log(`🚀 data`, data);
    // const { data } = await axios.get<Interface[]>('/endpoint');
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel value={'dark'} control={<Radio />} label={'Dark'} />
              <FormControlLabel value={'light'} control={<Radio />} label={'Light'} />
              <FormControlLabel value={'custom'} control={<Radio />} label={'Custom'} />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // console.log(req);
  // const cookies = req.cookies;
  const { theme = 'light' } = req.cookies;

  const validThemes = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
    },
  };
};

export default ThemeChangerPage;
