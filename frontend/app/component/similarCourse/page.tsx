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
import { AppDispatch, RootState } from "@/app/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { sameCategoryCourseAction } from "@/app/redux/features/courseSlice/sameCategoryCourse"
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
  course_image: string
}

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "900",
  paddingBottom: "20px",
}))

export default function SimilarCourse({ course }: any) {
  const dispatch: AppDispatch = useDispatch()
  const pathname = usePathname()
  const courseId = pathname.split("/").pop()

  const sameCourse = useSelector((state: RootState) => state.sameCategory)
  const { courses, error, loading } = sameCourse

  React.useEffect(() => {
    dispatch(sameCategoryCourseAction(courseId as string))
  }, [dispatch, courseId])

  return (
    <div className={styles.main}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Typography>{error as string}</Typography>
      ) : (
        <Container>
          <Title>
            Similar course on{" "}
            <span className={styles.instructor}>{course}</span> :
          </Title>
          <Box>
            <Grid container>
              {courses.map((course: Course) => (
                <Grid item md={3} key={course.id}>
                  <Link href={`/pages/courseDetailPage/${course.id}`} style={{textDecoration:'none'}}>
                  <Card
                    sx={{ width: 250, height: 300, backgroundColor: "#f2fde4" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='140'
                        image={course.course_image}
                        alt='green iguana'
                      />
                      <CardContent>
                        <Typography className={styles.cardTitle}>
                          {course.course_name}
                        </Typography>
                        <Typography className={styles.cardCategory}>
                          {course.course_category}
                        </Typography>
                        <Typography className={styles.cardInstructor}>
                          {course.course_instructor}
                        </Typography>
                        <Rating defaultValue={4.5} size='small' />
                        <Typography className={styles.cardPrice}>
                          &#x20B9; {course.course_price}
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
      )}
    </div>
  )
}
