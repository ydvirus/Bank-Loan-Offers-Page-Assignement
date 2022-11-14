import * as React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import { Box, Drawer, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Sidenav from './common/component/Sidenav';
import LoanOffer from './pages/LoanOffer/LoanOffer';
import SidenavDrawer from './common/component/SidenavDrawer';

export default function App() {
  return (
    <Box
      sx={{ flexGrow: 1, margin: '10px', bgcolor: '#ffffff', height: '100vh' }}
      className="App"
    >
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ height: 'fit-content' }}>
          <Stack direction="row">
            <SidenavDrawer />
            <Typography sx={{ color: '#2b226d', fontWeight: '600' }}>
              Welcome Yusuf, You have{' '}
              <Box
                component="span"
                sx={{ color: 'red', textDecoration: 'underline' }}
              >
                {' '}
                Notification ( 1 )
              </Box>{' '}
              <Box component="span" sx={{ color: '#9ca2a9', fontSize: '12px' }}>
                Inbox
              </Box>{' '}
              <Box component="span" sx={{ color: 'red', fontSize: '12px' }}>
                (0 new)
              </Box>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={3} id="sidenav">
          <Sidenav />
        </Grid>
        <Grid item xs sx={{ height: '100%' }}>
          <Stack direction="column">
            <LoanOffer />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
