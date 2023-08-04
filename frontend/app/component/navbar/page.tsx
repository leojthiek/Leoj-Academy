"use client"

import React from "react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material"
import Link from "next/link"
import SearchIcon from "@mui/icons-material/Search"
import styles from "./page.module.css"
import SchoolIcon from "@mui/icons-material/School"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { AppDispatch, RootState } from "@/app/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { logoutAction } from "@/app/redux/features/userSlice/loginSlice"
import { resetCourse } from "@/app/redux/features/courseSlice/coursePuchaseDetailSlice"

interface User {
  username: string
}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})

const RightBar = styled("div")(({ theme }) => ({}))

const LeftBar = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
}))

const Search = styled("div")(({ theme }) => ({
  width: "300px",
  display: "flex",
  backgroundColor: "white",
  alignItems: "center",
  borderRadius: "10px",
}))

const FirstBar = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const SecondBar = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const SmallScreenRightBar = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

export default function Navbar() {
  const [drawer, setDrawer] = React.useState({
    left: false,
  })



  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  const loginUser = useSelector<RootState, { user: User | null }>(
    (state) => state.loginUser
  )
  const { user } = loginUser


  const handleLogout = () =>{
    if(user){
      dispatch(logoutAction())
      dispatch(resetCourse())
      router.push('/pages/loginPage')
    }
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setDrawer({ ...drawer, left: open })
    }

  const list = (
    <Box
      sx={{ width: 270, paddingTop: "40px" }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          marginBottom: "16px",
        }}
      >
        <SearchIcon sx={{ marginRight: "8px", color: "gray" }} />
        <InputBase
          placeholder='Search'
          inputProps={{ "aria-label": "search" }}
          sx={{ flexGrow: 1, color: "gray", borderBottom: "1px solid gray" }}
          onClick={(event) => event.stopPropagation()}
        />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary='Cart' />
          </ListItemButton>
        </ListItem>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>{" "}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  < LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary='Sign out' />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='Sign In' />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )

  return (
    <AppBar position='sticky' className={styles.navbar}>
      <StyledToolbar>
        <RightBar>
          <Link href='/'>
            <img src='/logo.png' alt='logo' className={styles.logo} />
          </Link>
        </RightBar>
        <LeftBar>
          <FirstBar>
            <Search>
              <InputBase
                placeholder='Search courses...'
                style={{ color: "black", paddingLeft: "10px" }}
                className={styles.input}
              />
            </Search>
          </FirstBar>
          <SecondBar>
            <Typography className={styles.navCourse}>Courses</Typography>
            <Link href={'/pages/dashboardPage'} style={{textDecoration:'none'}}>
            <Typography className={styles.navCourse}>Dashboard</Typography>
            </Link>

           
              {user ? <>
              <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                <Avatar style={{width:'25px',height:'25px'}}/>
              <Typography className={styles.navUser}>{user.username}</Typography>
              </div>

              <IconButton onClick={handleLogout} style={{color:'white'}}> 
                  <LogoutIcon />
              </IconButton>
            
              </>:
               <Link href='/pages/loginPage'>
              <Typography className={styles.signInLink}>Sign In</Typography>
             </Link>

          }
          </SecondBar>
          <SmallScreenRightBar>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Drawer
              anchor='left'
              open={drawer.left}
              onClose={toggleDrawer(false)}
            >
              {list}
            </Drawer>
          </SmallScreenRightBar>
        </LeftBar>
      </StyledToolbar>
    </AppBar>
  )
}
