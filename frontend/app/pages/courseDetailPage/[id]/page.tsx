"use client"

import React from "react"
import dynamic from "next/dynamic"
import { Box, Button, Container, Grid, Typography, styled } from "@mui/material"
import styles from "./page.module.css"
import { getCourseDetailAction } from "@/app/redux/features/courseSlice/courseDetailSlice"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"

const CourseDetailCarousel = dynamic(
  () => import("@/app/component/courseDetailCarousel/page")
)
const CourseContent = dynamic(
  () => import("@/app/component/courseContent/page")
)

const InstructorCourse = dynamic(
  () => import("@/app/component/instructorCourse/page")
)
const SimilarCourse = dynamic(
  () => import("@/app/component/similarCourse/page")
)

const Review = styled("div")(({ theme }) => ({
  display: "flex",
}))

interface Course {
  id:string,
  course_name: string
  course_description: string
  course_price: number
  course_instructor: string
  numOfReviews: number
  rating: number
  course_category: string
  chapter: [
    {
      id: string
      Chapter_title: string
      Chapter_description: string
      content: [
        {
          id: string
          title: string
          description: string
          videoURL: string
        }
      ]
    }
  ]
}

export default function CourseDetailPage() {
  const pathname = usePathname()
  const courseId = pathname.split("/").pop()
  const dispatch: AppDispatch = useDispatch()

  const courseDetail = useSelector<
    RootState,
    { course:null | Course; error: unknown; loading: boolean }
  >((state) => state.courseDetail)
  const { course, error, loading } = courseDetail

  React.useEffect(() => {
    dispatch(getCourseDetailAction(courseId as string))
  }, [dispatch, courseId])

  return (
    <Box>
      <Box>
        <CourseDetailCarousel />
      </Box>
      <Box>
        <CourseContent />
      </Box>
      <Box>
        <Container>
          <Typography className={styles.title}>
            Review made by student on this course :
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <Typography className={styles.username}>vincent</Typography>
              <Typography className={styles.rating}>xxxx</Typography>
              <Typography className={styles.comment}>
                It is an excellent course for beginners to start with. Not only
                does it have fantastic teaching of the course material but it
                also directs you to extra materials you can look for.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography className={styles.username}>vincent</Typography>
              <Typography className={styles.rating}>xxxx</Typography>
              <Typography className={styles.comment}>
                It is an excellent course for beginners to start with. Not only
                does it have fantastic teaching of the course material but it
                also directs you to extra materials you can look for.
              </Typography>
            </Grid>
          </Grid>
          <div className={styles.btnContainer}>
            <Button size='small' variant='outlined'>
              Show more reviews
            </Button>
          </div>
        </Container>
      </Box>
      <Box>
        <InstructorCourse/>
      </Box>
      <Box>
        <SimilarCourse />
      </Box>
    </Box>
  )
}
