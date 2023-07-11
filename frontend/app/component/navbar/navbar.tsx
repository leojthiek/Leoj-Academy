"use client"

import React from "react"
import styles from "./page.module.css"
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
  Badge,
} from "@mui/material"
import MoreIcon from "@mui/icons-material/MoreVert"
import { ShoppingCart } from "@mui/icons-material"

const StyleToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}))

const NavText = styled("div")(({ theme }) => ({
  display: "none",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}))

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems:'center',
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [anchorEl,setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };


  return (
    <AppBar position='sticky' className={styles.main}>
      <StyleToolbar>
        <img src='logo.png' alt='logo' className={styles.logo} />
        <Search>
          <InputBase placeholder='Search courses...' />
        </Search>
        
        <NavText>
        <IconButton aria-label='cart'>
            <Badge badgeContent={4} color='error'>
              <ShoppingCart className={styles.cartIcon} />
            </Badge>
          </IconButton>
          <Typography>Courses</Typography>
          <Typography>Sign In</Typography>
        </NavText>
        <Icons >
          <IconButton aria-label='cart'>
            <Badge badgeContent={4} color='error'>
              <ShoppingCart className={styles.cartIcon} />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClick}>
          <MoreIcon className={styles.more}/>
          </IconButton>
        </Icons>
      </StyleToolbar>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Courses</MenuItem>
        <MenuItem>Sign In</MenuItem>
      </Menu>
    </AppBar>
  )
}
