"use client"

import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import Link from "next/link"

const LeftDashBoard = styled("div")(({ theme }) => ({
  minHeight: "90vh",
  backgroundColor: "#e9ebb2",
  color:'#1639d9'
}))

export default function AdminLeftGrid() {
  return (
    <Box>
      
          <LeftDashBoard>
            <div className={styles.logoContainer}>
              <Typography gutterBottom className={styles.logo}>
                Leoj Academy
              </Typography>
            </div>
            <div className={styles.leftMain}>
                <Container>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#1639d9'}}>
                      <DashboardIcon />
                    </ListItemIcon>
                   <Typography className={styles.iconText}>Dashboard</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#1639d9'}}>
                      <PeopleAltIcon />
                    </ListItemIcon>
                   <Typography className={styles.iconText}>Users</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#1639d9'}}>
                      <SchoolIcon />
                    </ListItemIcon>
                   <Typography className={styles.iconText}>Courses</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
              <div className={styles.controllerContainer}>
                <Typography className={styles.controller}>Controller</Typography>
              </div>
              <List>
              <ListItem disablePadding>
                <Link href={'/pages/createCoursePage'} style={{textDecoration:'none'}}>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#1639d9'}}>
                      <SchoolIcon />
                    </ListItemIcon>
                   <Typography className={styles.iconText}>Manage Course</Typography>
                  </ListItemButton>
                  </Link>
                </ListItem>
              </List>
              </Container>
            </div>
          </LeftDashBoard>

        
    </Box>
  )
}
