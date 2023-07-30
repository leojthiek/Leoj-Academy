"use client"

import React from "react"
import dynamic from "next/dynamic"
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material"
import styles from "./page.module.css"
import { getCourseDetailAction } from "@/app/redux/features/courseSlice/courseDetailSlice"
import { useRouter, usePathname } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { coursePurchaseDetailAction } from "@/app/redux/features/courseSlice/coursePuchaseDetailSlice"
import Link from "next/link"

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
  id: string
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

const CourseDetailContainer = styled(Box)(({ theme }) => ({
  textTransform: "capitalize",
  paddingTop: "20px",
}))

export default function CourseDetailPage() {
  const pathname = usePathname()
  const courseId = pathname.split("/").pop()
  const dispatch: AppDispatch = useDispatch()

  const courseDetail = useSelector<
    RootState,
    { course: null | Course; error: unknown; loading: boolean }
  >((state) => state.courseDetail)
  const { course, error, loading } = courseDetail

  const coursePurchaseDetail = useSelector(
    (state: RootState) => state.coursePurchaseDetail
  )
  const {
    course: coursePurchase,
    error: coursePurchaseError,
    loading: coursePurchaseLoading,
  } = coursePurchaseDetail

  React.useEffect(() => {
    dispatch(coursePurchaseDetailAction(courseId as string))
    dispatch(getCourseDetailAction(courseId as string))
  }, [dispatch, courseId])

  return (
    <CourseDetailContainer>
      <Box>
        {coursePurchase !== null && !coursePurchaseError ? (
          <Box>
            <Container>
              <Grid container height={300} style={{paddingTop:'25px'}}>
                <Grid item md={5}>
                  <div>
                  <img src='/pyton.jpg' alt='images'  width={460}/>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className={styles.mainContainer}>
                    <Typography className={styles.courseName}>{course?.course_name}</Typography>
                    <Typography className={styles.courseDesc}>{course?.course_description}</Typography>
                    <Typography className={styles.rating}> Rating : ({course?.rating}) {course?.numOfReviews} students</Typography>
                    <Typography className={styles.instructor}> Instructor : <span> {course?.course_instructor}</span> </Typography>    
                  </div>
                  <div className={styles.btnContainer}>
                    <Link href={`/pages/videoPlayingPage/${course?.id}`}>
                     <Button className={styles.button} variant="contained">Go to course</Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ) : (
          <CourseDetailCarousel />
        )}
      </Box>
      <Box>
        {coursePurchase !== null && !coursePurchaseError ?  '' : 
        <CourseContent />
}
      </Box>
      <Box>
        <Container>
          <Typography className={styles.title}>
            Review made by student on this course :
          </Typography>
          <Grid container>
            <Grid item md={6}>
              <div className={styles.commentUser}>
                <div className={styles.avatar}>
                  <Avatar sx={{ bgcolor: "#00439d" }}>VI</Avatar>
                </div>
                <div>
                  <Typography className={styles.username}>vincent</Typography>
                  <Typography className={styles.rating}>xxxx</Typography>
                </div>
              </div>

              <Typography className={styles.comment}>
                It is an excellent course for beginners to start with. Not only
                does it have fantastic teaching of the course material but it
                also directs you to extra materials you can look for.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <div className={styles.commentUser}>
                <div className={styles.avatar}>
                  <Avatar sx={{ bgcolor: "#00439d" }}>TI</Avatar>
                </div>
                <div>
                  <Typography className={styles.username}>Tim</Typography>
                  <Typography className={styles.rating}>xxxx</Typography>
                </div>
              </div>
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
        <InstructorCourse />
      </Box>
      <Box>
        <SimilarCourse course={course?.course_category} />
      </Box>
    </CourseDetailContainer>
  )
}
