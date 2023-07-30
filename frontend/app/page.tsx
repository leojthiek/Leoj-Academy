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
<<<<<<< HEAD
// import { Card, Button } from "react-bootstrap"
// import Link from "next/link"
=======
import styles from "./page.module.css"
import { useDispatch,useSelector } from "react-redux"
import { getTopCourseAction } from "./redux/features/courseSlice/topCourseSlice"
import { AppDispatch, RootState } from "./redux/store"
import Link from "next/link"
>>>>>>> branch

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
<<<<<<< HEAD
  const dispatch: AppDispatch = useDispatch()
  const topCourses = useSelector((state: RootState) => state.topCourse)
  const { topCourse, error, loading } = topCourses
=======
  
  const dispatch:AppDispatch=useDispatch()
>>>>>>> branch

  const topCourse = useSelector((state:RootState)=>state.topCourse)
  const {course,error,loading} = topCourse

  React.useEffect(()=>{
    dispatch(getTopCourseAction())
<<<<<<< HEAD
  }, [dispatch])

  return (
    <main>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>error</h3>
      ) : (
        <div className={styles.card}>
          hello
          {/* {topCourse &&
            topCourse.map((course: Course) => (
              <Card style={{ width: "16rem" }} key={course.id}>
                <Card.Img variant='top' src='js.jpg' />
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>{course.course_description}</Card.Text>
                  <Card.Text>{course.numOfReviews}</Card.Text>
                  <Card.Text>{course.rating}</Card.Text>
                  <Card.Text>{course.course_instructor}</Card.Text>
                  <Card.Text>{course.course_price}</Card.Text>
=======
  },[dispatch])
  return (
    <div className={styles.main}>
      
      <Container>
        {loading ? (<Skeleton variant="text" sx={{fontSize:'22px'}}/>) : error ? (<p>{error as string}</p>) : 
        <>
        <Title>
          Most Rated course by <span className={styles.instructor}>Student</span> :
        </Title>
>>>>>>> branch

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
<<<<<<< HEAD
            ))} */}
        </div>
      )}
    </main>
=======
            </Link>

            </Grid>
            ))}

          </Grid>
        </Box>
      </>
}
      </Container>
    </div>
>>>>>>> branch
  )
}
