import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Accordion, Container } from "react-bootstrap"
import { AppDispatch, RootState } from "@/app/redux/store"
import styles from "./page.module.css"
import { fetchVideoUrl } from "@/app/redux/featuresSlice/contentSlice/contentSlice"
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

  const getCourse = useSelector<
    RootState,
    { course: Course | null; error: any; loading: boolean }
  >((state) => state.courseDetail)

  const { course, error, loading } = getCourse

  const getVideo = useSelector<
    RootState,
    { url: string; error: any; loading: boolean }
  >((state) => state.videoSlice)
  const { url, error: videoError, loading: videoLoading } = getVideo

  const handleVideoPlay = async(videoUrl: string) => {
   try {
    await dispatch(
        fetchVideoUrl({ bucketName: "leojacademy-video", keyName: videoUrl })
      )
      setShowVideo(true)
   } catch (error) {
    
   }
  }

  const videoExit = () => {
    setShowVideo(false)
  }

  return (
    <div className={styles.main}>
      <Container>
        <h2 className={styles.title}>Course content :</h2>

        {course?.chapter.map((courses) => (
          <Accordion key={courses.id} className={styles.accordian}>
            <Accordion.Item eventKey={courses.id}>
              <Accordion.Header>{courses.Chapter_title}</Accordion.Header>
              {courses.content.map((contents) => (
                <Accordion.Body
                  key={contents.id}
                  onClick={() => handleVideoPlay(contents.videoURL)}
                >
                  {contents.title}
                </Accordion.Body>
              ))}
            </Accordion.Item>
          </Accordion>
        ))}

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        {showVideo && (
          <div className={styles.videoContainer}>
            <div className={styles.videoWrapper}>
              <ReactPlayer url={url} controls />
              <button className={styles.closeButton} onClick={videoExit}>
                Close Video
              </button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
