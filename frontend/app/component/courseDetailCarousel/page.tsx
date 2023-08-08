"use client"

import {
  Button,
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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import {  RootState } from "@/app/redux/store"
import { useSelector } from "react-redux"

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

const FirstBox = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: "20px",
  paddingBottom: "20px",
}))

const SecondBox = styled(Grid)(({ theme }) => ({
  paddingTop: "20px",
  paddingBottom: "20px",
}))

const CourseName = styled(Typography)(({ theme }) => ({
  fontSize: "35px",
  fontWeight: "900",
  fontFamily:'secular one',
  paddingBottom:'10px'
}))



export default function CourseDetailCarousel() {
  const courseDetail = useSelector<RootState,{course:Course | null,error:unknown,loading:boolean}>((state)=> state.courseDetail)
  const {course,error,loading} = courseDetail
  return (
    <div className={styles.main}>
    {loading ? (<p>Loading...</p>) : error ? <p>{error as string}</p> :
      <Container>
        <Grid container>
          <FirstBox item md={8}>
            <CourseName>{course && course.course_name}</CourseName>
            <Typography className={styles.desc}>
              {course && course.course_description}
            </Typography>
            <Typography className={styles.item}>
              Instructor : <span className={styles.span}>{course && course.course_instructor}</span>
            </Typography>
            <Typography className={styles.item}>
              Category : <span className={styles.span}>{course && course.course_category}</span>
            </Typography>
            <Typography className={styles.item}>
              Rating : <span className={styles.span}>xxxxx(123)</span>
            </Typography>
          </FirstBox>
          <SecondBox item md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image='/pyton.jpg'
                  alt='green iguana'
                />
                <CardContent>
                  <Typography className={styles.item}>
                    Price :{" "}
                    <span className={styles.cardSpan}> &#x20B9; {course && course.course_price}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>

              <div className={styles.btnContainer}>
                <Button variant='contained' className={styles.cardBtn}>
                  Buy this now
                </Button>
              </div>

              <Typography className={styles.cardText}>
                30 days money back gurantee
              </Typography>
              <Typography className={styles.cardTextLast}>
                Buy now and get life time access to this course
              </Typography>
              <div className={styles.btnContainer}>
                <Button
                  variant='outlined'
                  className={styles.cardBtn}
                  endIcon={<AddShoppingCartIcon />}
                >
                  Add to cart
                </Button>
              </div>
            </Card>
          </SecondBox>
        </Grid>
      </Container>
}
    </div>
  )
}
