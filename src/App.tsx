import { Box, Button, Card, CardContent, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchProfileList } from './helpers';
import { Profile } from './types';
import { swiper } from './util';

const Header = () => {
  const matches = useMediaQuery('(min-width:850px)');
  return (
    <Box
      component={'header'}
      height="12vh"
      bgcolor="#6bbd6b"
      width="45vw"
      m="0 auto"
      borderRadius={'7px'}
      color="whitesmoke"
    >
      <Box display={'flex'} width="100%" justifyContent={'space-between'}>
        <MenuIcon sx={{ pr: '3%', fontSize: matches ? '4rem' : '3rem' }} />
        <Box
          fontWeight={'bold'}
          fontFamily="monospace"
          pt="0.4%"
          fontSize={matches ? '3rem' : '2rem'}
        >
          出会い系サイト
        </Box>
        <SearchIcon sx={{ pl: '3%', fontSize: matches ? '4rem' : '3rem' }} />
      </Box>
    </Box>
  );
};

const genderMap = new Map<'male' | 'female' | undefined, string>([
  ['male', '男性'],
  ['female', '女性'],
  [undefined, ''],
]);
let swipe: (prevOrNext: -1 | 1) => number;
function App() {
  const [profileList, setProfileList] = useState<Profile[]>([]);
  useEffect(() => {
    (async () => {
      const list = await fetchProfileList();
      setProfileList(list);
      swipe = swiper(0, list.length - 1);
    })();
  }, []);
  const [idx, setIdx] = useState(0);
  return (
    <>
      <Header />
      <Box
        height="66vh"
        width="45vw"
        m="0 auto"
        borderRadius={'7px'}
        color="whitesmoke"
        fontFamily={'Roboto'}
      >
        <Box>
          <Card sx={{ height: '45vh', width: '100%', margin: '0 auto' }}>
            <CardContent>
              <Box display="flex" justifyContent={'flex-end'}>
                <Button
                  onClick={() => {
                    const prevIdx = swipe(-1);
                    setIdx(prevIdx);
                  }}
                >
                  前へ
                </Button>
                <Button
                  onClick={() => {
                    const nextIdx = swipe(1);
                    setIdx(nextIdx);
                  }}
                >
                  次へ
                </Button>
              </Box>
              <Box
                component={'img'}
                src={profileList[idx]?.picture || ''}
                width="28%"
                height="30%"
                borderRadius={'10px'}
                display="block"
                margin="0 auto"
              />
              <Box
                bgcolor="whitesmoke"
                height="5vh"
                width="80%"
                m="0 auto"
                mt="3vh"
                pt="2%"
                textAlign={'center'}
                borderRadius={'10px'}
                color={'00000085'}
                sx={{
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: '41%',
                    left: '50%',
                    marginLeft: '-15px',
                    border: '15px solid transparent',
                    borderBottom: '15px solid whitesmoke',
                  },
                }}
              >
                {profileList[idx]?.greeting}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Divider sx={{ color: 'darkgray' }} />
        <Card sx={{ height: '40vh', width: '100%', margin: '0 auto' }}>
          <CardContent>
            <Box
              width="85%"
              textAlign={'center'}
              height="75%"
              pt="3%"
              pl="15%"
              pr="0%"
            >
              <Box display={'flex'} pb="1%">
                <Box
                  width="50%"
                  fontWeight={'bold'}
                  fontSize="1.7rem"
                  textAlign={'left'}
                  pb="4%"
                  color={'#000000b8'}
                >
                  基本情報
                </Box>
                <Box width={'50%'} />
              </Box>
              <Box display={'flex'}>
                <Box width="50%" textAlign={'left'} color={'#00000085'}>
                  プロフィール
                </Box>
                <Box width={'50%'} textAlign={'left'} color="lightblue">
                  {profileList[idx]?.name}
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box width="50%" textAlign={'left'} color={'#00000085'}>
                  年齢
                </Box>
                <Box width="50%" textAlign={'left'} color="lightblue">
                  {profileList[idx]?.age}
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box width="50%" textAlign={'left'} color={'#00000085'}>
                  性別
                </Box>
                <Box width="50%" textAlign={'left'} color="lightblue">
                  {genderMap.get(profileList[idx]?.gender)}
                </Box>
              </Box>
              <Box display={'flex'}>
                <Box width="50%" textAlign={'left'} color={'#00000085'}>
                  収入
                </Box>
                <Box width="50%" textAlign={'left'} color="lightblue">
                  {profileList[idx]?.balance}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
export default App;
