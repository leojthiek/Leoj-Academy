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
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/app/redux/store"

interface User {
  username: string
}

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
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const userLogin = useSelector<RootState, { user: User | null }>(
    (state) => state.login
  )
  const { user } = userLogin

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <AppBar position='sticky' className={styles.main}>
      <StyleToolbar>
        <Link href='/'>
          <img src='/logo.png' alt='logo' className={styles.logo} />
        </Link>
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
          {user ? (
            <Link href='#' passHref>
              <Typography style={{ color: "white" }}>
                {user.username}
              </Typography>
            </Link>
          ) : (
            <Link href='/pages/LoginPage' passHref>
              <Typography style={{ color: "white" }}>Sign In</Typography>
            </Link>
          )}
        </NavText>
        <Icons>
          <IconButton aria-label='cart'>
            <Badge badgeContent={4} color='error'>
              <ShoppingCart className={styles.cartIcon} />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreIcon className={styles.more} />
          </IconButton>
        </Icons>
      </StyleToolbar>
      <Menu
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Courses</MenuItem>
        {user ? (
          <MenuItem>{user.username}</MenuItem>
        ) : (
          <Link href='/pages/LoginPage'>
            <MenuItem>Sign In</MenuItem>
          </Link>
        )}
      </Menu>
    </AppBar>
  )
}
