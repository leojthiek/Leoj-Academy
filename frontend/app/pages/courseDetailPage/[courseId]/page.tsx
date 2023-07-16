// "use client"

// import React from "react"
// import { usePathname } from "next/navigation"
// import { getCourseDetailsActions } from "@/app/redux/featuresSlice/courseSlice/courseDetailSlice"
// import { useDispatch, useSelector } from "react-redux"
// import { Row, Col, Card, Button, Container } from "react-bootstrap"
// import { AppDispatch, RootState } from "@/app/redux/store"
// import Image from "next/image"
// import styles from "./page.module.css"
// import CourseContent from "@/app/component/content/content"
// import InstructorCourse from "@/app/component/instructorCOurse/instructorCourse"

// interface Course {
//   course_name: string
//   course_description: string
//   course_price: number
//   course_instructor: string
//   numOfReviews: number
//   rating: number
//   course_category: string
// }

// export default function courseDetail() {
//   const pathName = usePathname()
//   const id = pathName.split("/").pop()
//   const dispatch: AppDispatch = useDispatch()

//   const getCourse = useSelector<
//     RootState,
//     { course: Course | null; error: any; loading: boolean }
//   >((state) => state.courseDetail)
//   const { course, error, loading } = getCourse

//   React.useEffect(() => {
//     dispatch(getCourseDetailsActions(id as string))
//   }, [dispatch, id])

//   return (
//     <div className={styles.carousel}>
//       {loading ? (
//         <h2>Loading...</h2>
//       ) : error ? (
//         <h2>{error}</h2>
//       ) : (
//         <Container>

//           <Row className={styles.row1} >
//             <Col md={6} className={styles.left}>

//               {course && (
//                 <>
//                   <h1 className={styles.text}>{course.course_name}</h1>
//                   <p className={styles.text}>{course.course_description}</p>
//                   <p className={styles.text}>
//                     Instructor : {course.course_instructor}
//                   </p>
//                   <p className={styles.text}>Rating : {course.rating}</p>
//                   <p className={styles.text}>
//                     {" "}
//                     Price : &#8377;{course.course_price}
//                   </p>
//                 </>
//               )}

//             </Col>
//             <Col md={6} className={styles.right}>
//               <Card className={styles.card}>
//                 <Card.Img
//                   variant='top'
//                   src='/js.jpg'
//                   className={styles.cardImg}
//                 />
//                 <Card.Body>
//                   <Card.Text className={styles.card_text}>
//                     Buy now and get a life time access for this course
//                   </Card.Text>
//                   <div className={styles.button_container}>
//                     <button className={styles.button}>Buy</button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//       )}
//       <Row>
//         <Col className={styles.mode}>
//           <h2 className={styles.mode_text}>
//             Interested in Reading Instead of Watching ?
//           </h2>
//           <div className={styles.mode_button_container}>
//             <Button className={styles.mode_button}>Text mode</Button>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <CourseContent />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//         <InstructorCourse/>
//         </Col>
//       </Row>
//     </div>
//   )
// }
