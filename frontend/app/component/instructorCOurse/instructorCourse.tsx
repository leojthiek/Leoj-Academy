// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, Container } from "react-bootstrap";
// import { AppDispatch, RootState } from "@/app/redux/store";
// import styles from "./styles.module.css";
// import { getInstructorCourseAction } from "@/app/redux/featuresSlice/courseSlice/instructorCOurseSlice";
// import { usePathname } from "next/navigation";

// interface Course {
//     id:string
//   course_name: string;
//   course_description: string;
//   course_price: number;
//   course_instructor: string;
//   numOfReviews: number;
//   rating: number;
//   course_category: string;
// }

// export default function CourseContent() {
//     const pathName = usePathname()
//     const id = pathName.split('/').pop()
//   const dispatch: AppDispatch = useDispatch();

//   const { instructorCourse, error, loading } = useSelector((state: RootState) => state.instructorCourse) as {
//     instructorCourse: Course[];
//     error: any;
//     loading: boolean;
//   };


//   React.useEffect(()=>{
//     dispatch(getInstructorCourseAction(id as string))
//   },[dispatch,id])

//   return (
//     <div className={styles.div}>

//       <Container>
//         <h1 className={styles.head_text}>Course with similar Instructor :</h1>
//         {instructorCourse.map((course)=>(
//              <Card  key={course.id} className={styles.main}>
//              <Card.Img variant="top" src="/js.jpg" className={styles.image}/>
//              <Card.Body className={styles.body}>
//                <Card.Title style={{paddingBottom:'5px',fontWeight:'bold'}}>{course.course_name}</Card.Title>
//                <Card.Text>Rating: {course.rating}</Card.Text>
//                <Card.Text>Instructor: {course.course_instructor}</Card.Text>
//                <Card.Text>Price: &#8377;{course.course_price}</Card.Text>
//              </Card.Body>
//            </Card>
//         ))}
//       </Container>
//     </div>
//   );
// }
