"use client"

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import { useSelector,useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { getInstructorCourse } from "@/app/redux/features/courseSlice/instructorSlice"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface Course {
  id: string
  course_name: string
  course_description: string
  course_price: number
  course_instructor: string
  numOfReviews: number
  rating: number
  course_category: string
  course_image:string
}

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "900",
  paddingBottom: "20px",
}))

export default function InstructorCourse({instructor}:any) {
  const dispatch:AppDispatch= useDispatch()
  const pathname = usePathname()
  const courseId = pathname.split('/').pop()

  const instructorCourse = useSelector((state:RootState)=>state.instructorCourse)
  const {course,error,loading} = instructorCourse

  React.useEffect(()=>{
    dispatch(getInstructorCourse(courseId as string))
  },[dispatch,courseId])

  return (
    <div className={styles.main}>
     
     
      <Container>
        <Title>
          More course by <span className={styles.instructor}>{instructor}</span> :
        </Title>
        <Box>
          <Grid container gap={2}>
          {course.map((cours:Course)=>(

            <Grid item md={3} key={cours.id}>
              <Link href={`/pages/courseDetailPage/${cours.id}`} style={{textDecoration:'none'}}>
              <Card sx={{width:250,height:300,backgroundColor:'#f2fde4'}}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image={cours.course_image}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography className={styles.cardTitle}>
                      {cours.course_name}
                    </Typography>
                    <Typography className={styles.cardCategory}>
                      {cours.course_category}
                    </Typography>
                    <Typography className={styles.cardInstructor}>
                    {cours.course_instructor}
                    </Typography>
                    <Rating defaultValue={4.5} size="small"/>
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
      </Container>
    </div>
  )
}
