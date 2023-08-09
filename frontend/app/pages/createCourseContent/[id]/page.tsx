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
import { getAllChapterAction } from "@/app/redux/features/courseSlice/allChapter"
import { getAllChapterContentAction } from "@/app/redux/features/contentSlice/getChapterContentSlice"
import { createContentAction } from "@/app/redux/features/contentSlice/createContentSlice"

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
  const [videoFile,setVideoFile] = React.useState<File | null>(null)

  const pathname = usePathname()
  const chapterId = pathname.split("/").pop()

  const dispatch: AppDispatch = useDispatch()

  const chapterContent = useSelector<
    RootState,
    { contents: null | Chapters; error: unknown; loading: boolean }
  >((state) => state.chapterContent)

  const { contents, error, loading } = chapterContent

  const createContent = useSelector((state: RootState) => state.createContent)
  const {
    content,
    error: createContentError,
    loading: createContentLoading,
  } = createContent

  React.useEffect(() => {
    dispatch(getAllChapterContentAction(chapterId as string))
    if (content) {
      dispatch(getAllChapterContentAction(chapterId as string))
    }
  }, [dispatch, chapterId,content])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description || !videoFile) {
      alert("Please fill all required fields.");
      return;
    }
    if (chapterId) {
      const formData = new FormData()
      formData.append("title",title)
      formData.append("description",description)
      formData.append("video",videoFile)

      dispatch(createContentAction({formData,chapterId}))
    }
    setTitle("")
    setDescription("")
  }

  const handleVideoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
     const files = e.target.files

     if(files && files.length > 0){
      const file = files[0]
      setVideoFile(file)
     }
     
  }

  return (
    <Box sx={{ textTransform: "capitalize" }}>
      <Grid container>
        <Grid item md={2}>
          <AdminLeftGrid />
        </Grid>
        <Grid item md={10}>
          <Link href={`/pages/createChapterPage/${contents?.id}`}>
            <Button>back</Button>
          </Link>
          <Container>
            <div className={styles.pageTitleContainer}>
              <Typography sx={{fontSize:'20px',fontWeight:'800',fontFamily:'sans-serif'}}>
                Create content for chapter :{" "}
                <span className={styles.courseTableTitle}>
                  {contents?.Chapter_title}
                </span>{" "}
                -
              </Typography>
            </div>
            <FormContainer>
              <Form onSubmit={handleSubmit}>
                <Grid item md={10}>
                  <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
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
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
                      content video
                    </Typography>
                    <TextField
                      type='file'
                      id="videoFile"
                      onChange={handleVideoChange}
                      required
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container style={{ paddingTop: "20px" }}>
                  <Grid item md={10}>
                    <Typography sx={{paddingBottom:'5px',fontSize:'17px',fontFamily:'sans-serif',fontWeight:'700'}}>
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
                    {createContentLoading ? "creating content..." : "create content"}
                  </Button>
                </Box>
              </Form>
            </FormContainer>
            <Box sx={{ paddingTop: "50px" }}>
              <Box sx={{ paddingBottom: "30px" }}>
                <Typography sx={{fontSize:'20px',fontWeight:'800',fontFamily:'sans-serif'}}>
                  content list for the chapter{" "}
                  <span className={styles.courseTableTitle}>
                    {contents?.Chapter_title}
                  </span>
                </Typography>
              </Box>
              {loading ? <Typography>Loading...</Typography> : error ? <Typography>{error as string}</Typography> :
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "black" }}>
                    <TableRow>
                      <StyledTableCell>Content id</StyledTableCell>
                      <StyledTableCell>content Title</StyledTableCell>
                      <StyledTableCell>video key</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contents?.content.map((cont) => (
                      <TableRow key={cont.id}>
                        <StyledBodyTableCell>{cont.id}</StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {cont.title}
                        </StyledBodyTableCell>
                        <StyledBodyTableCell>
                          {cont.videoURL}
                        </StyledBodyTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Box>
  )
}
