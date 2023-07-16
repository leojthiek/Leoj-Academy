"use client"

import styles from "./page.module.css"
import { getTopCourseAction } from "./redux/featuresSlice/courseSlice/topCourseSlice"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./redux/store"
import { AppDispatch } from "./redux/store"
import React from "react"
// import { Card, Button } from "react-bootstrap"
// import Link from "next/link"

interface Course {
  id: string
  course_name: string
  course_description: string
  course_price: number
  course_instructor: number
  numOfReviews: number
  rating: number
}

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  const topCourses = useSelector((state: RootState) => state.topCourse)
  const { topCourse, error, loading } = topCourses

  React.useEffect(() => {
    dispatch(getTopCourseAction())
  }, [dispatch])

  return (
    <main>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>error</h3>
      ) : (
        <div className={styles.card}>
          hello
          {/* {topCourse &&
            topCourse.map((course: Course) => (
              <Card style={{ width: "16rem" }} key={course.id}>
                <Card.Img variant='top' src='js.jpg' />
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                  <Card.Text>{course.course_description}</Card.Text>
                  <Card.Text>{course.numOfReviews}</Card.Text>
                  <Card.Text>{course.rating}</Card.Text>
                  <Card.Text>{course.course_instructor}</Card.Text>
                  <Card.Text>{course.course_price}</Card.Text>

                  <Link href={`/pages/courseDetailPage/${course.id}`}>
                    <Button variant='primary'>Go somewhere</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))} */}
        </div>
      )}
    </main>
  )
}
