"use client"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"
import styles from "./page.module.css"
import { AppDispatch, RootState } from "@/app/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { fetchVideoUrl } from "@/app/redux/features/contentSlice/contentSlice"
import ReactPlayer from "react-player"

interface Course {
  id: string
  course_name: string
  course_description: string
  course_price: number
  course_instructor: string
  numOfReviews: number
  rating: number
  course_category: string
  chapter: Chapter[]
}

interface Chapter {
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

export default function CourseContent() {
  const [showVideo, setShowVideo] = React.useState(false)
  const dispatch: AppDispatch = useDispatch()

  const courseDetails = useSelector<
    RootState,
    { course: Course | null; error: unknown; loading: boolean }
  >((state) => state.courseDetail)
  const { course, error, loading } = courseDetails

  const fetchVideo = useSelector<
    RootState,
    { url: string; error: any | string; loading: boolean }
  >((state) => state.videoUrl)
  const { url, error: videoError, loading: videoLoasing } = fetchVideo

  const handleVideoShow = (videoUrl: string) => {
    if (course?.id) {
      try {
        dispatch(
          fetchVideoUrl({
            id: course?.id,
            bucketName: "leoj_academy",
            keyName: videoUrl,
          })
        )
        setShowVideo(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const videoExit = () => {
    setShowVideo(false)
  }

  return (
    <div className={styles.main}>
      <Container>
        <Typography className={styles.mainTitle}>Course content :</Typography>
        <hr />
        {course?.chapter.map((cours) => (
          <Accordion key={cours.id}>
            <AccordionSummary
              className={styles.chapterContainer}
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={styles.chapterName}>
                {cours.Chapter_title}
              </Typography>
            </AccordionSummary>
            {cours.content.map((conten) => (
              <AccordionDetails key={conten.id}>
                <AccordionSummary
                  onClick={() => handleVideoShow(conten.videoURL)}
                >
                  <Typography className={styles.contentName}>
                    {conten.title}
                  </Typography>
                </AccordionSummary>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Container>
      {showVideo && (
        <div className={styles.videoContainer}>
          <div className={styles.videoWrapper}>
            {videoLoasing && <h1>Loading...</h1>}
            {videoError && (
              <h5 style={{ color: "white" }}>{videoError as string}</h5>
            )}
            <ReactPlayer url={url} controls />
            <button className={styles.closeButton} onClick={videoExit}>
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
