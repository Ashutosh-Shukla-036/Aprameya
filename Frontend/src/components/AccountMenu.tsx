import * as React from 'react';
import Box from '@mui/material/Box';
//import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import MovieIcon from '@mui/icons-material/Movie';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useSetRecoilState } from 'recoil';
import { UserAtom } from '../Atoms/UserAtom';

export default function AccountMenu() {
  const setUser = useSetRecoilState(UserAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear stored user data
    localStorage.removeItem('token');
    setUser(null); // Reset user state
    console.log('User logged out');
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{
              ml: 2,
              color: '#FFFFFF',
              backgroundColor: '#1E1E1E',
              '&:hover': { backgroundColor: '#3C3C3C' },
              borderRadius: '50%',
            }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 8,
            sx: {
              width: 260,
              borderRadius: 2,
              background: 'linear-gradient(90deg, #282828 0%, #3A3A3A 100%)',
              color: '#F5F5F5',
              mt: 1.5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.3))',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 18,
                width: 10,
                height: 10,
                background: 'inherit',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <FavoriteIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Favorites
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <StarIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Ratings & Reviews
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <MovieIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Watchlist
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Account Settings
        </MenuItem>
        <Divider sx={{ borderColor: '#707070', my: 1 }} />
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          sx={{
            '&:hover': {
              backgroundColor: '#404040',
              color: '#FFFFFF',
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
