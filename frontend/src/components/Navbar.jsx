import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LightModeIcon from '@mui/icons-material/LightMode';

const theme = createTheme({
    palette: {
      purple: {
        main: '#8656cd',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });
 
const pages = ['Dues', 'Groups', 'Savings'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({thememode,toggle,setUser,user,setFlag,flag}) {

  const navigate=useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navuser,setNavuser] = useState({})
 
  // ------------ hook to handle the user details ------------------ 
  useEffect(()=>{
    const check=async()=>{
      try{
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          console.log(loggedInUser);
          const foundUser = JSON.parse(loggedInUser);
          console.log("found user",foundUser  )
          setNavuser(foundUser)
          await setUser(foundUser);
        }
      }catch(err){
        console.log(err)
      }
    }
    check()
  },[user?._id,flag])

  console.log(user);
  const [showNav, setShowNav] = useState(false);
  
  //  ------------- function to logout ----------------------- 
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  
  

  function Logout() {
    localStorage.clear();
    navigate('/login');
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', elevation: 0 }}>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="favicon.ico" style={{height:"50px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={()=>{navigate("/dashboard")}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'poppins',
              fontWeight: 700,
              letterSpacing: '.1rem',
            color: thememode === 'dark' ? 'white' : '#000080',
            cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            Paisa Vasooli
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key="Dues"
                onClick={()=>{navigate("/dues")}}
                sx={{
                    my: 2,
                    color: thememode === 'dark' ? 'white' : '#000080',    
                    display: 'block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: thememode==='dark'?'white':'#000080',
                      bottom: '-2px',
                      left: 0,
                      transform: 'scaleX(0)',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    },
                  }}
              >
               Dues
              </Button>
              <Button
                key="Groups"
                onClick={()=>{navigate("/groups")}}
                sx={{
                    my: 2,
                    color: thememode === 'dark' ? 'white' : '#000080',
                    display: 'block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: thememode==='dark'?'white':'#000080',
                      bottom: '-4px', // Adjust this value to move the underline up or down
                      left: 0,
                      transform: 'scaleX(0)',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    },
                  }}
              >
                Groups
              </Button>
              <Button
                key="Savings"
                onClick={()=>{navigate("/savings")}}
                sx={{
                    my: 2,
                    color: thememode === 'dark' ? 'white' : '#000080',   
                    display: 'block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: thememode==='dark'?'white':'#000080',
                      bottom: '-4px', // Adjust this value to move the underline up or down
                      left: 0,
                      transform: 'scaleX(0)',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    },
                  }}
              >
                Savings
              </Button>
              <Button
                key="Charts"
                onClick={()=>{navigate("/charts")}}
                sx={{
                    my: 2,
                    color: thememode === 'dark' ? 'white' : '#000080',
                    display: 'block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: thememode==='dark'?'white':'#000080',
                      bottom: '-4px', // Adjust this value to move the underline up or down
                      left: 0,
                      transform: 'scaleX(0)',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    },
                  }}
              >
                Charts
              </Button>
              <Button
                key="Stocks"
                onClick={()=>{navigate("/stocks")}}
                sx={{
                    my: 2,
            color: thememode === 'dark' ? 'white' : '#000080',

                    display: 'block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      backgroundColor: thememode==='dark'?'white':'#000080',
                      bottom: '-4px', // Adjust this value to move the underline up or down
                      left: 0,
                      transform: 'scaleX(0)',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out',
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    },
                  }}
              >
                Stocks
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <LightModeIcon 
          onClick={toggle}
          sx={{
            color: thememode === 'dark' ? 'white' : 'inherit',
            cursor: 'pointer'
          }}
          />
            <MailOutlineIcon sx={{mx: 2,
            color: thememode === 'dark' ? 'white' : 'inherit',
            cursor: 'pointer'
             }}
             onClick={()=>{navigate("/inbox")}}
            />
            {/* <Tooltip title=""> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={navuser?.image || 'ProfileImg.jpeg'} />
              </IconButton>
            {/* </Tooltip> */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key="Profile" onClick={()=>{navigate("/profile")}}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key="Vault" onClick={()=>{navigate("/vault")}}>
                  <Typography textAlign="center">Vault</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={()=>{Logout()}}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
