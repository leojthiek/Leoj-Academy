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
import AdminLeftGrid from "@/app/component/adminLeftGrid/page"



export default function CreateCoursePage() {
  return (
    <Box>
      <Grid container>
        <Grid item md={2}>
         <AdminLeftGrid/>
        </Grid>

        <Grid item md={10} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Typography sx={{fontFamily:'secular one', fontSize:'30px'}}>This is an admin Dashboard</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
