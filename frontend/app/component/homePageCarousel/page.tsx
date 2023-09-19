import { Box, Button, Typography, styled } from "@mui/material"
import Link from "next/link"
import React from "react"


const TitleTop = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "900",
  textTransform:'capitalize',
  fontFamily:'sans-serif',

  [theme.breakpoints.down('md')]:{
    fontSize:'2rem',
    fontWeight:'700',
    textTransform:'capitalized',
    fontFamily:'sans-serif',
    paddingLeft:'20px'
    
  }
}))

const TitleBottom = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "900",
  textTransform:'capitalize',
  fontFamily:'sans-serif',

  [theme.breakpoints.down('md')]:{
    fontSize:'1rem',
    fontWeight:'700',
    textTransform:'capitalized',
    fontFamily:'sans-serif',
    paddingLeft:'20px'
    
  }
}))

const TextBox = styled(Box)(({theme})=>({
  position:'absolute',
  top:'18%',
  right:'20%',
  padding:'20px',
  color:'white',
  width:'600px',
  textAlign:'center',

  [theme.breakpoints.down('md')]:{
    width:'100%',
    position:'absolute',
    color:'white',
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    flexDirection:'column',
    right:'0',
  }
}))





export default function HomePageCarousel() {

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <img
        src={"/homepage.jpg"}
        alt='home image'
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <TextBox
      >
        <TitleTop
        >
          Your Learning Adventure Begins Here
        </TitleTop>
        <TitleBottom
        >
          Learn, grow, and excel with our diverse range of courses designed to
          elevate your skills and knowledge
        </TitleBottom>
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
        >
            <Link href={'/pages/loginPage'}>
          <Button variant='contained'>Get Started</Button>

            </Link>
        </Box>
      </TextBox>
    </Box>
  )
}
