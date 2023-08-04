"use client"

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import AdminLeftGrid from "@/app/component/adminLeftGrid/page"
import styles from "./page.module.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { getCourseDetailAction } from "@/app/redux/features/courseSlice/courseDetailSlice"
import { usePathname } from "next/navigation"
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

const FormContainer = styled("div")(({ theme }) => ({
  paddingTop: "30px",
}))

const Form = styled("form")(({ theme }) => ({}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "white",
  fontWeight: "700",
  fontSize: "18px",
}))

const StyledBodyTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "16px",
  fontFamily: "secular one",
}))

export default function CreateCoursePage() {
  const [chapterTitle, setChapterTitle] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

  const pathname = usePathname()
  const courseId = pathname.split("/").pop()

  const dispatch: AppDispatch = useDispatch()

  const courseDetails = useSelector<
    RootState,
    { course: Course | null; error: unknown; loading: boolean }
  >((state) => state.courseDetail)
  const { course, error, loading } = courseDetails

  const chapters = course?.chapter

  React.useEffect(() => {
    dispatch(getCourseDetailAction(courseId as string))
  }, [dispatch, courseId])

  const handleSubmit = () => {}

  return (
    <Box sx={{ textTransform: "capitalize" }}>
      <Grid container>
        <Grid item md={2}>
          <AdminLeftGrid />
        </Grid>
        <Grid item md={10}>
          <Link href={"/pages/createCoursePage"}>
            <Button>back</Button>
          </Link>
          <Container>
            <div className={styles.pageTitleContainer}>
              <Typography className={styles.pageTitle}>
                Create chapter for course :{" "}
                <span className={styles.courseTableTitle}>
                  {course?.course_name}
                </span>{" "}
                -
              </Typography>
            </div>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Grid item md={10}>
                  <Typography className={styles.inputTitle}>
                    Chapter Title
                  </Typography>
                  <TextField
                    size='medium'
                    required
                    label='Eg:chapter name'
                    variant='outlined'
                    type='text'
                    fullWidth
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    className={styles.textField}
                  />
                </Grid>

                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={10}>
                    <Typography className={styles.inputTitle}>
                      Course description
                    </Typography>
                    <TextField
                      label='short description'
                      type='text'
                      required
                      multiline
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box sx={{ paddingTop: "20px" }}>
                  <Button type='submit' variant='contained'>
                    create chapter
                  </Button>
                </Box>
              </Form>
            </FormContainer>
            <Box sx={{ paddingTop: "50px" }}>
              <Box sx={{ paddingBottom: "30px" }}>
                <Typography className={styles.rightBottomTitle}>
                  chapter list for the course{" "}
                  <span className={styles.courseTableTitle}>
                    {course?.course_name}
                  </span>
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "black" }}>
                    <TableRow>
                      <StyledTableCell>Chapter id</StyledTableCell>
                      <StyledTableCell>Chapter Title</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chapters?.map((chapter) => (
                      <TableRow key={chapter.id}>
                        <StyledBodyTableCell>{chapter.id}</StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {chapter.Chapter_title}
                        </StyledBodyTableCell>
                        <StyledBodyTableCell>
                          <Link
                            href={`/pages/createCourseContent/${chapter?.id}`}
                          >
                            <Button size={"small"} variant={"contained"}>
                              create content
                            </Button>
                          </Link>
                        </StyledBodyTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}
