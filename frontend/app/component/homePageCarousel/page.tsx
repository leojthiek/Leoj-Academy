import { Box, Button, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import React from "react"

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
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          right: "20%",
          padding: "20px",
          color: "white",
          width: "600px",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "35px",
            fontWeight: "900",
            fontFamily: "sans-serif",
          }}
        >
          Your Learning Adventure Begins Here
        </Typography>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "sans-serif",
          }}
        >
          Learn, grow, and excel with our diverse range of courses designed to
          elevate your skills and knowledge
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
        >
            <Link href={'/pages/loginPage'}>
          <Button variant='contained'>Get Started</Button>

            </Link>
        </Box>
      </Box>
    </Box>
  )
}
