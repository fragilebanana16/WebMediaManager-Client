import { Stack, Typography, Link, Box, Item, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../../assets/Images/logo.ico"
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import { Nav_Buttons, Profile_Menu, Nav_Setting } from "../../data";
import zIndex from '@mui/material/styles/zIndex';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  //   const { dispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack alignItems={"center"}
      direction={"row"}
      sx={{ width: "100%", height: "70px", backgroundColor:"grey", position:"sticky", top:0 }}
      justifyContent="space-between" zIndex="999"
    >
      <Stack spacing={2} direction="row" sx={{
        direction: "row", padding: "0px 50px",
        alignItems: "center",
        height: "70px",
      }}>
        {/* logo */}
        <Box
          component="img"
          sx={{
            height: "50px",
            marginRight: "40px",
          }}
          alt="Netflix"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        />
        <Typography variant="subtitle2"
          sx={{ mt: 3, textAlign: 'center' }}
        >
          <Link to="/" color="text.primary" style={{ cursor: "pointer", marginRight: "20px", marginLeft: "30px", textDecoration: 'none' }}>
            Homepage
          </Link>
        </Typography>
        <Typography variant="subtitle2"
          sx={{ mt: 3, textAlign: 'center' }}
        >
          <Link to="/" color="text.primary" style={{ cursor: "pointer", marginRight: "20px", textDecoration: 'none' }}>
            My List
          </Link>
        </Typography>
      </Stack>

      {/* right */}
      <Stack spacing={2} direction="row" sx={{
        direction: "row", padding: "0px 50px",
        alignItems: "center",
        height: "70px",
      }}>
        <Stack sx={{ width: "100%" }} >
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" ></MagnifyingGlass>
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…"
              inputProps={{ "aria-label": "search" }}></StyledInputBase>
          </Search>
        </Stack>

        {/* avatar */}
        <Box sx={{
          backgroundColor: 'transparent',
          height: 64, width: 64, borderRadius: 1.5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
          id="basic-button"
          onClick={handleClick}
        >
          <img src={Logo} alt={"Chat App Logo"}
            style={{ borderRadius: "10px", border: '2px solid rgba(255, 255, 255, 1)' }}
          />

        </Box>
        {/* click Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Stack spacing={1} px={1}>
            {Profile_Menu.map((el) => (
              <MenuItem key={el.title}>
                <Stack onClick={() => {
                  if (el.index == 2) {
                    // dispatch(LogoutUser()); // watch out for the ()
                  }
                  else {
                    // navi(getMenuPath(el.index));
                  }
                }} sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                  <span>
                    {el.title}
                  </span>
                  {el.icon}
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        </Menu>


      </Stack>
    </Stack>
  );
};

export default Navbar;
