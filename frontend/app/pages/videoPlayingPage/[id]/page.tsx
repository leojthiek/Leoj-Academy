"use client"

import { getCourseDetailAction } from "@/app/redux/features/courseSlice/courseDetailSlice"
import { AppDispatch, RootState } from "@/app/redux/store"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Checkbox,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"
import { usePathname } from "next/navigation"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./page.module.css"
import ReactPlayer from "react-player"
import { fetchVideoUrl } from "@/app/redux/features/contentSlice/contentSlice"
import { ExpandMore, OndemandVideo } from "@mui/icons-material"

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

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  textTransform: "capitalize",
  fontFamily: "secular one",
  alignItems: "center",
  fontWeight: "800",
  height: "100%",
  paddingLeft: "10px",
}))

const VideoContainer = styled("div")(({ theme }) => ({
  height: "600px",
  width: "1200px",
  backgroundColor: "black",
}))

export default function VideoPlayingPage() {
  const [about, setAbout] = React.useState<boolean>(false)
  const [review, setReview] = React.useState<boolean>(true)

  const dispatch: AppDispatch = useDispatch()
  const pathname = usePathname()
  const courseId = pathname.split("/").pop()

  const courseDetail = useSelector<
    RootState,
    { course: Course | null; error: unknown; loading: boolean }
  >((state) => state.courseDetail)
  const { course, error, loading } = courseDetail

  const fetchVideo = useSelector<
    RootState,
    { url: string; error: any | string; loading: boolean }
  >((state) => state.videoUrl)
  const { url, error: videoError, loading: videoLoasing } = fetchVideo

  const chapter = course?.chapter[0]
  const content = chapter?.content[0]

  React.useEffect(() => {
    if (content) {
      dispatch(
        fetchVideoUrl({
          bucketName: "leoj_academy",
          keyName: content.videoURL,
          id: course?.id as string,
        })
      )
    }
    dispatch(getCourseDetailAction(courseId as string))
  }, [dispatch])

  const handleShowVideo = (videoUrl: string, videoId: string) => {
    dispatch(
      fetchVideoUrl({
        bucketName: "leoj_academy",
        keyName: videoUrl,
        id: videoId,
      })
    )
  }

 

  const handleClickAbout = () =>{
    setAbout(true)
    setReview(false)
  }

  const handleClickReview = () =>{
    setAbout(false)
    setReview(true)
  }

  return (
    <Box>
      <div className={styles.courseTitleContainer}>
        <Title>{course?.course_name}</Title>
      </div>
      <Grid container style={{}}>
        <Grid item md={8}>
          <VideoContainer>
            <ReactPlayer url={url} controls width={1200} height={600} />
          </VideoContainer>
          <Container>
            <div className={styles.select}>
              <div onClick={handleClickAbout}>
                <Typography className={styles.selectItem} style={{borderBottom: about ? '2px solid black': ''}}>About</Typography>
              </div>
              <div onClick={handleClickReview}>
                <Typography className={styles.selectItem} style={{borderBottom: review ? '2px solid black': ''}}>Review</Typography>
              </div>
            </div>

            {about ? (
              <>
                <div style={{ paddingTop: "20px" }}>
                  <Typography className={styles.about}>
                    About this course
                  </Typography>
                  <Typography className={styles.aboutCourse}>
                    See details about{" "}
                    <span style={{ color: "brown" }}>
                      {course?.course_name}
                    </span>
                  </Typography>
                  <Typography className={styles.aboutDetails}>
                    Course Name :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_name}
                    </span>
                  </Typography>
                  <Typography className={styles.aboutDetails}>
                    Category :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_category}
                    </span>
                  </Typography>
                  <Typography className={styles.aboutDetails}>
                    Instructor :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_instructor}
                    </span>
                  </Typography>
                  <Typography className={styles.aboutDetails}>
                    Description :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_description}
                    </span>
                  </Typography>
                </div>
              </>
            ) : review ? (
              <div className={styles.reviews}>
                <div className={styles.bottomReview}>
                  <Typography className={styles.reviewTitle}>
                    Review made by student on this course :
                  </Typography>
                </div>
                <div>
                  <div className={styles.commentUser}>
                    <div className={styles.avatar}>
                      <Avatar sizes='small' sx={{ bgcolor: "#00439d" }}>
                        VI
                      </Avatar>
                    </div>
                    <div>
                      <Typography className={styles.username}>
                        vincent
                      </Typography>
                      <Typography className={styles.rating}>xxxx</Typography>
                    </div>
                  </div>
                </div>
                <Typography className={styles.comment}>
                  It is an excellent course for beginners to start with. Not
                  only does it have fantastic teaching of the course material
                  but it also directs you to extra materials you can look for.
                </Typography>

                <div>
                  <div className={styles.commentUser}>
                    <div className={styles.avatar}>
                      <Avatar sizes='small' sx={{ bgcolor: "#00439d" }}>
                        VI
                      </Avatar>
                    </div>
                    <div>
                      <Typography className={styles.username}>
                        vincent
                      </Typography>
                      <Typography className={styles.rating}>xxxx</Typography>
                    </div>
                  </div>
                </div>
                <Typography className={styles.comment}>
                  It is an excellent course for beginners to start with. Not
                  only does it have fantastic teaching of the course material
                  but it also directs you to extra materials you can look for.
                </Typography>
              </div>
            ) : (
              ""
            )}
          </Container>
        </Grid>
        <Grid item md={4}>
          <Container>
            <div style={{ paddingBottom: "20px" }}>
              <Typography gutterBottom className={styles.rightTitle}>
                Course content
              </Typography>
            </div>

            {course?.chapter.map((cours) => (
              <Accordion key={cours.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography className={styles.chapterTitle}>
                    {cours.Chapter_title}
                  </Typography>
                </AccordionSummary>
                {cours.content.map((cont) => (
                  <AccordionDetails key={cont.id}>
                    <div className={styles.contentTitleContainer}>
                      <Checkbox
                        color='success'
                      ></Checkbox>
                      <OndemandVideo />
                      <Typography
                        onClick={() =>
                          handleShowVideo(cont.videoURL, course.id)
                        }
                        className={styles.contentTitle}
                      >
                        {cont.title}
                      </Typography>
                    </div>
                  </AccordionDetails>
                ))}
              </Accordion>
            ))}
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}
