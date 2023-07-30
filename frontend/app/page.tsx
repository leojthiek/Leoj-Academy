"use client"

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import { useDispatch,useSelector } from "react-redux"
import { getTopCourseAction } from "./redux/features/courseSlice/topCourseSlice"
import { AppDispatch, RootState } from "./redux/store"
import Link from "next/link"

interface Course {
   id:string,
   course_name:string,
   course_price:number,
   course_instructor:string,
   rating:string
}


const Title = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "900",
  paddingBottom:'20px'
}))

export default function Home() {
  
  const dispatch:AppDispatch=useDispatch()

  const topCourse = useSelector((state:RootState)=>state.topCourse)
  const {course,error,loading} = topCourse

  React.useEffect(()=>{
    dispatch(getTopCourseAction())
  },[dispatch])
  return (
    <div className={styles.main}>
      
      <Container>
        {loading ? (<Skeleton variant="text" sx={{fontSize:'22px'}}/>) : error ? (<p>{error as string}</p>) : 
        <>
        <Title>
          Most Rated course by <span className={styles.instructor}>Student</span> :
        </Title>

        <Box>
       
          <Grid container>
          {course.map((cours:Course)=>(
            
            <Grid item md={3} key={cours.id}>
              <Link href={`/pages/courseDetailPage/${cours.id}`} style={{textDecoration:'none'}}>
              <Card sx={{ maxWidth:250 }}>
                <CardActionArea>
                 
                    
                    <CardMedia
                    component='img'
                    height='140'
                    image='/pyton.jpg'
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography className={styles.cardTitle} >
                       {cours.course_name}
                    </Typography>
                    <Typography className={styles.cardInstructor}>
                     {cours.course_instructor}
                    </Typography>
                    <Typography className={styles.cardRating}>
                     xxxx (345)
                    </Typography>
                    <Typography className={styles.cardPrice}>
                    &#x20B9; {cours.course_price}
                    </Typography>
                  </CardContent>
                  
                
                  
                </CardActionArea>
              </Card>
            </Link>

            </Grid>
            ))}

          </Grid>
        </Box>
      </>
}
      </Container>
    </div>
  )
}
