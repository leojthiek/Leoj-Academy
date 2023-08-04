"use client"

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
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
import { getChapterDetailAction } from "@/app/redux/features/courseSlice/chapterDeailSlice"

interface Chapters {
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
  course: {
    id: string
    course_name: string
    course_description: string
    course_price: number
    course_instructor: string
    numOfReviews: number
    rating: number
    course_category: string
  }
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

export default function CreateContentPage() {
  const [title, setTitle] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

  const pathname = usePathname()
  const chapterId = pathname.split("/").pop()

  const dispatch: AppDispatch = useDispatch()

  const chapterDetails = useSelector<
    RootState,
    { chapter: Chapters | null; error: unknown; loading: boolean }
  >((state) => state.chapterDetail)
  const { chapter, error, loading } = chapterDetails

  React.useEffect(() => {
    dispatch(getChapterDetailAction(chapterId as string))
  }, [dispatch, chapterId])

  const handleSubmit = () => {}

  return (
    <Box sx={{ textTransform: "capitalize" }}>
      <Grid container>
        <Grid item md={2}>
          <AdminLeftGrid />
        </Grid>
        <Grid item md={10}>
          <Link href={`/pages/createChapterPage/${chapter?.course.id}`}>
            <Button>back</Button>
          </Link>
          <Container>
            <div className={styles.pageTitleContainer}>
              <Typography className={styles.pageTitle}>
                Create content for chapter :{" "}
                <span className={styles.courseTableTitle}>
                  {chapter?.Chapter_title}
                </span>{" "}
                -
              </Typography>
            </div>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Grid item md={10}>
                  <Typography className={styles.inputTitle}>
                    Content Title
                  </Typography>
                  <TextField
                    size='medium'
                    required
                    label='Eg:content name'
                    variant='outlined'
                    type='text'
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.textField}
                  />
                </Grid>

                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={10}>
                    <Typography className={styles.inputTitle}>
                      content video
                    </Typography>
                    <TextField
                      type='file'
                      required
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={10}>
                    <Typography className={styles.inputTitle}>
                      Content description
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
                    create content
                  </Button>
                </Box>
              </Form>
            </FormContainer>
            <Box sx={{ paddingTop: "50px" }}>
              <Box sx={{ paddingBottom: "30px" }}>
                <Typography className={styles.rightBottomTitle}>
                 content list for the chapter{" "}
                  <span className={styles.courseTableTitle}>
                    {chapter?.Chapter_title}
                  </span>
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "black" }}>
                    <TableRow>
                      <StyledTableCell>Content id</StyledTableCell>
                      <StyledTableCell>content Title</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chapter?.content.map((content) => (
                      <TableRow key={content.id}>
                        <StyledBodyTableCell>{content.id}</StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {content.title}
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
