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
  maxHeight:"600px",
  width: "100%",
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
      <Grid container>
        <Grid item md={7}>
          <VideoContainer>
            <ReactPlayer url={url} controls width="100%" height="100%" />
          </VideoContainer>
        </Grid>
        <Grid item md={5}>
          <Container>
            <div style={{ paddingBottom: "20px" }}>
              <Typography gutterBottom sx={{fontFamily:'sans-serif',fontWeight:'800',fontSize:'18px'}}>
                Course content
              </Typography>
            </div>

            {course?.chapter.map((cours) => (
              <Accordion key={cours.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{fontFamily:'sans-serif',fontWeight:'600',fontSize:'19px',textTransform:'capitalize'}}>
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
                        sx={{fontSize:'16px',fontFamily:'secular one',cursor:'pointer',textTransform:'capitalize'}}
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
      <div style={{paddingLeft:'20px', marginTop:"50px"}}>
            <div className={styles.select}>
              <div onClick={handleClickAbout}>
                <Typography sx={{borderBottom: about ? '2px solid black': '', fontFamily:'sans-serif',fontSize:'19px',fontWeight:'800',cursor:'pointer'}}>About</Typography>
              </div>
              <div onClick={handleClickReview}>
                <Typography sx={{borderBottom: review ? '2px solid black': '', fontFamily:'sans-serif',fontSize:'19px',fontWeight:'800',cursor:'pointer'}}>Review</Typography>
              </div>
            </div>

            {about ? (
              <>
                <div style={{ paddingTop: "20px" }}>
                  <Typography sx={{fontFamily:'sans-serif',fontWeight:'800',fontSize:'22px'}}>
                    About this course
                  </Typography>
                  <Typography sx={{fontFamily:'sans-serif',fontSize:'16',fontWeight:'400',paddingBottom:'20px'}}>
                    See details about{" "}
                    <span style={{ color: "brown" }}>
                      {course?.course_name}
                    </span>
                  </Typography>
                  <Typography sx={{fontFamily:'sans-serif',fontSize:'19',fontWeight:'600',paddingTop:'10px',display:'flex',alignItems:'center',gap:'30px',paddingBottom:'30px',borderBottom:'1px solid gray',textTransform:"capitalize"}}>
                    Course Name :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_name}
                    </span>
                  </Typography>
                  <Typography sx={{fontFamily:'sans-serif',fontSize:'19',fontWeight:'600',paddingTop:'10px',display:'flex',alignItems:'center',gap:'30px',paddingBottom:'30px',borderBottom:'1px solid gray',textTransform:"capitalize"}}>
                    Category :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_category}
                    </span>
                  </Typography>
                  <Typography sx={{fontFamily:'sans-serif',fontSize:'19',fontWeight:'600',paddingTop:'10px',display:'flex',alignItems:'center',gap:'30px',paddingBottom:'30px',borderBottom:'1px solid gray',textTransform:"capitalize"}}>
                    Instructor :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_instructor}
                    </span>
                  </Typography>
                  <Typography sx={{fontFamily:'sans-serif',fontSize:'19',fontWeight:'600',paddingTop:'10px',display:'flex',alignItems:'center',gap:'30px',paddingBottom:'30px',borderBottom:'1px solid gray',textTransform:"capitalize"}}>
                    Description :{" "}
                    <span className={styles.aboutSpan}>
                      {course?.course_description}
                    </span>
                  </Typography>
                </div>
              </>
            ) : review ? (
              <div>
                <Box sx={{paddingTop:'30px',paddingBottom:'30px'}}>
                  <Typography sx={{fontSize:'22px',fontWeight:'800'}}>
                    Review made by student on this course :
                  </Typography>
                </Box>
                <div>
                  <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <Box className={styles.avatar}>
                      <Avatar sizes='small' sx={{ bgcolor: "#00439d" }}>
                        VI
                      </Avatar>
                    </Box>
                    <div>
                      <Typography sx={{fontSize:'18px',fontWeight:'700',paddingTop:'10px'}}>
                        vincent
                      </Typography>
                      <Typography sx={{fontWeight:'700'}}>xxxx</Typography>
                    </div>
                  </Box>
                </div>
                <Typography sx={{fontWeight:'600',fontFamily:'secular one',paddingTop:'15px'}}>
                  It is an excellent course for beginners to start with. Not
                  only does it have fantastic teaching of the course material
                  but it also directs you to extra materials you can look for.
                </Typography>

                <Box sx={{paddingTop:'20px'}}>
                  <Box sx={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div className={styles.avatar}>
                      <Avatar sizes='small' sx={{ bgcolor: "#00439d" }}>
                        VI
                      </Avatar>
                    </div>
                    <div>
                      <Typography sx={{fontSize:'18px',fontWeight:'700',paddingTop:'10px'}}>
                        vincent
                      </Typography>
                      <Typography sx={{fontWeight:'700'}}>xxxx</Typography>
                    </div>
                  </Box>
                </Box>
                <Typography sx={{fontWeight:'600',fontFamily:'secular one',paddingTop:'15px'}}>
                  It is an excellent course for beginners to start with. Not
                  only does it have fantastic teaching of the course material
                  but it also directs you to extra materials you can look for.
                </Typography>
              </div>
            ) : (
              ""
            )}
            </div>
    </Box>
  )
}
