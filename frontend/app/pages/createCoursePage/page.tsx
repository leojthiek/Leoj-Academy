"use client"

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
import { getOneLatestCourseAction } from "@/app/redux/features/courseSlice/getOneLatestCourseSlice"
import { createCourseAction } from "@/app/redux/features/courseSlice/createCourseSlice"
import Link from "next/link"

interface Course {
  course_name: string
  course_category: string
  course_instructor: string
  id: string
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
  const [showCourse, setShowCourse] = React.useState<boolean>(false)
  const [course_name, setCourseName] = React.useState<string>("")
  const [course_description, setCourseDesc] = React.useState<string>("")
  const [course_category, setCourseCategory] = React.useState<string>("")
  const [course_instructor, setCourseInstructor] = React.useState<string>("")
  const [course_image, setCourseImage] = React.useState<string>("")
  const [course_price, setCoursePrice] = React.useState<number>()

  const dispatch: AppDispatch = useDispatch()

  const latestCourse = useSelector<
    RootState,
    { course: null | Course[]; error: unknown; loading: boolean }
  >((state) => state.latestCourse)
  const { course, error, loading } = latestCourse

  const createCourse = useSelector((state: RootState) => state.createCourse)
  const { error: createCourseError, loading: createCourseLoading } =
    createCourse

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const courseData = {
      course_category,
      course_description,
      course_image,
      course_instructor,
      course_name,
      course_price,
    }

    try {
      await dispatch(createCourseAction(courseData))
      setCourseCategory("")
      setCourseDesc("")
      setCourseInstructor("")
      setCourseName("")
      setCoursePrice(Number())
      setCourseImage("")
      setShowCourse(true)
      await dispatch(getOneLatestCourseAction())
    } catch (error) {
      console.error("Error creating course:", error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files && files.length > 0) {
      const file = files[0]
      transformFile(file)
    }
  }

  const transformFile = (file: File) => {
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setCourseImage(reader.result as string)
      }
    } else {
      setCourseImage("")
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid item md={2}>
          <AdminLeftGrid />
        </Grid>
        <Grid item md={10}>
          <Container>
            <div className={styles.pageTitleContainer}>
              <Typography  sx={{fontSize:'22px',fontWeight:'700',fontFamily:'sans-serif'}}>
                Create a course -
              </Typography>
            </div>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Grid container gap={2}>
                  <Grid item md={5}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course title
                    </Typography>
                    <TextField
                      size='medium'
                      required
                      label='Eg:business management'
                      variant='outlined'
                      type='text'
                      fullWidth
                      value={course_name}
                      onChange={(e) => setCourseName(e.target.value)}
                      className={styles.textField}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course Category
                    </Typography>
                    <TextField
                      size='medium'
                      required
                      label='Eg:category'
                      variant='outlined'
                      type='text'
                      fullWidth
                      value={course_category}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className={styles.textField}
                    />
                  </Grid>
                </Grid>
                <Grid container gap={2} style={{ paddingTop: "20px" }}>
                  <Grid item md={5}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course Instructor
                    </Typography>
                    <TextField
                      size='medium'
                      required
                      label='Eg:John Doe'
                      variant='outlined'
                      type='text'
                      value={course_instructor}
                      onChange={(e) => setCourseInstructor(e.target.value)}
                      fullWidth
                      className={styles.textField}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course Price
                    </Typography>
                    <TextField
                      size='medium'
                      required
                      placeholder='eg:100'
                      variant='outlined'
                      type='number'
                      value={course_price}
                      onChange={(e) => setCoursePrice(parseInt(e.target.value))}
                      fullWidth
                      className={styles.textField}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={6}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course image
                    </Typography>
                    <TextField
                      type='file'
                      required
                      size='medium'
                      variant='outlined'
                      onChange={handleImageUpload}
                      fullWidth
                      defaultValue={""}
                    />
                  </Grid>
                </Grid>

                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={10}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      Course description
                    </Typography>
                    <TextField
                      label='short description'
                      type='text'
                      required
                      multiline
                      value={course_description}
                      onChange={(e) => setCourseDesc(e.target.value)}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box sx={{ paddingTop: "20px" }}>
                  <Button type='submit' variant='contained'>
                    {createCourseLoading ? (
                       "Loading..."
                    ) : (
                      "create course"
                    )}
                  </Button>
                </Box>
              </Form>
            </FormContainer>
            <Box sx={{ paddingTop: "50px" }}>
              <Box sx={{ paddingBottom: "30px" }}>
                <Typography className={styles.rightBottomTitle}>
                  Newly created course :
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "black" }}>
                    <TableRow>
                      <StyledTableCell>courseId</StyledTableCell>
                      <StyledTableCell>course_name</StyledTableCell>
                      <StyledTableCell>course_category</StyledTableCell>
                      <StyledTableCell>course_instructor</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showCourse && course && (
                      <TableRow>
                        <StyledBodyTableCell>
                          {course[0].id}
                        </StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {course[0].course_name}
                        </StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {course[0].course_category}
                        </StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {course[0].course_instructor}
                        </StyledBodyTableCell>
                        <TableCell>
                          <Link
                            href={`/pages/createChapterPage/${course[0].id}`}
                          >
                            <Button size='small' variant='outlined'>
                              create chapter
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )}
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
