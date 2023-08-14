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
  backgroundColor: "#fcfad4",
  color:'#24231e'
}))

export default function AdminLeftGrid() {
  return (
    <Box>
      
          <LeftDashBoard>
            <div className={styles.logoContainer}>
              <Typography gutterBottom sx={{fontSize:'22px',fontWeight:'600',paddingTop:'30px',fontFamily:'secular one',textAlign:'center'}}>
                Leoj Academy
              </Typography>
            </div>
            <div className={styles.leftMain}>
                <Container>
              <List>
                <ListItem disablePadding>
                <Link href={'/pages/dashboardPage'} style={{textDecoration:'none',color:'#24231e'}}>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#24231e'}}>
                      <DashboardIcon />
                    </ListItemIcon>
                   <Typography sx={{fontSize:'18px',fontWeight:'600',fontFamily:'secular one'}}>Dashboard</Typography>
                  </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#24231e'}}>
                      <PeopleAltIcon />
                    </ListItemIcon>
                   <Typography sx={{fontSize:'18px',fontWeight:'600',fontFamily:'secular one'}}>Users</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#24231e'}}>
                      <SchoolIcon />
                    </ListItemIcon>
                   <Typography sx={{fontSize:'18px',fontWeight:'600',fontFamily:'secular one'}}>Courses</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
              <Box sx={{paddingTop:'30px'}}>
                <Typography sx={{fontSize:'15px',fontWeight:'600',color:'gray'}}>Controller</Typography>
              </Box>
              <List>
              <ListItem disablePadding>
                <Link href={'/pages/createCoursePage'} style={{textDecoration:'none'}}>
                  <ListItemButton>
                    <ListItemIcon style={{color:'#24231e'}}>
                      <SchoolIcon />
                    </ListItemIcon>
                   <Typography sx={{fontSize:'18px',fontWeight:'600',fontFamily:'secular one',color:'#24231e'}}>Manage Course</Typography>
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
