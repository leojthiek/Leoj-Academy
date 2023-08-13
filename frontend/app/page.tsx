"use client"

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Skeleton,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import { useDispatch,useSelector } from "react-redux"
import { getTopCourseAction } from "./redux/features/courseSlice/topCourseSlice"
import { AppDispatch, RootState } from "./redux/store"
import Link from "next/link"

interface Course {
   id:string,
   course_name:string,
   course_price:number,
   course_instructor:string,
   rating:string,
   course_image:string,
   course_category:string
}


const Title = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: "900",
  paddingBottom:'20px'
}))

export default function Home() {
  
  const dispatch:AppDispatch=useDispatch()

  const topCourse = useSelector((state:RootState)=>state.topCourse)
  const {course,error,loading} = topCourse

  React.useEffect(()=>{
    dispatch(getTopCourseAction())
  },[dispatch])
  return (
    <div className={styles.main}>
      
      <Container>
        {loading ? (<Skeleton variant="text" sx={{fontSize:'22px'}}/>) : error ? (<p>{error as string}</p>) : 
        <>
        <Title>
          Most Rated course by <span className={styles.instructor}>Student</span> :
        </Title>

        <Box>
       
          <Grid container>
          {course.map((cours:Course)=>(
            
            <Grid item md={3} key={cours.id}>
              <Link href={`/pages/courseDetailPage/${cours.id}`} style={{textDecoration:'none'}}>
              <Card sx={{ maxWidth:250 , height:300,backgroundColor:'#f2fde4'}}>
                <CardActionArea>
                 
                    
                    <CardMedia
                    component='img'
                    height='140'
                    image={cours.course_image}
                    alt='green iguana'
                  />
                  <CardContent sx={{textTransform:'capitalize'}}>
                    <Typography sx={{lineHeight:'1.2rem',fontSize:'1rem',fontFamily:'anton',fontWeight:'800',letterSpacing:'.02rem'}} >
                       {cours.course_name}
                    </Typography>
                    <Typography sx={{fontSize:'.90rem',fontFamily:'anton', fontWeight:'800',paddingTop:'8px'}}>
                     {cours.course_category}
                    </Typography>
                    <Typography sx={{fontSize:'.90rem',fontFamily:'anton', fontWeight:'800',color:'gray'}}>
                     {cours.course_instructor}
                    </Typography>
                    <Rating defaultValue={4.5} size="small"/>
                    <Typography sx={{fontWeight:'600',fontSize:'1.3rem',fontFamily:'secular one'}}>
                    &#x20B9; {cours.course_price}
                    </Typography>
                  </CardContent>
                  
                
                  
                </CardActionArea>
              </Card>
            </Link>

            </Grid>
            ))}

          </Grid>
        </Box>
      </>
}
      </Container>
    </div>
  )
}
