"use client"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"
import styles from "./page.module.css"
import { AppDispatch, RootState } from "@/app/redux/store"
import { useDispatch, useSelector } from "react-redux"
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
                  <Link href={'/pages/videoPlayingPage'} style={{textDecoration:'none'}}>
                  <Typography className={styles.contentName}>
                    {conten.title}
                  </Typography>
                  </Link>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Container>
    </div>
  )
}

