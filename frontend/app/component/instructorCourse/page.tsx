import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import { useSelector,useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { getInstructorCourse } from "@/app/redux/features/courseSlice/instructorSlice"
import { usePathname } from "next/navigation"

interface Course {
  id: string
  course_name: string
  course_description: string
  course_price: number
  course_instructor: string
  numOfReviews: number
  rating: number
  course_category: string
}

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "900",
  paddingBottom: "20px",
}))

export default function InstructorCourse() {
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
      {course.map((cours:Course)=>(

     
      <Container key={cours.id}>
        <Title>
          More course by <span className={styles.instructor}>{cours.course_instructor}</span> :
        </Title>
        <Box>
          <Grid container>
            
            <Grid item md={3}>
              <Card sx={{ maxWidth: 250 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image='/pyton.jpg'
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography className={styles.cardTitle}>
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
            </Grid>
           
          </Grid>
        </Box>
      </Container>
       ))}
    </div>
  )
}