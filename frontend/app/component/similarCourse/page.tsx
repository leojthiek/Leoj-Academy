import {
    Box,
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
  
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "22px",
    fontWeight: "900",
    paddingBottom:'20px'
  }))
  
  export default function SimilarCourse() {
    return (
      <div className={styles.main}>
        <Container>
          <Title>
            Similar course on <span className={styles.instructor}>Web development</span> :
          </Title>
          <Box>
            <Grid container>
              <Grid item md={3}>
                <Card sx={{ maxWidth:250 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image='/pyton.jpg'
                      alt='green iguana'
                    />
                    <CardContent>
                      <Typography className={styles.cardTitle} >
                        The complete sql boothbamp go from zero to hero
                      </Typography>
                      <Typography className={styles.cardInstructor}>
                       jimmy
                      </Typography>
                      <Typography className={styles.cardRating}>
                       xxxx (345)
                      </Typography>
                      <Typography className={styles.cardPrice}>
                      &#x20B9; 457
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card sx={{ maxWidth:250 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image='/pyton.jpg'
                      alt='green iguana'
                    />
                    <CardContent>
                      <Typography className={styles.cardTitle} >
                        The complete sql boothbamp go from zero to hero
                      </Typography>
                      <Typography className={styles.cardInstructor}>
                       jimmy
                      </Typography>
                      <Typography className={styles.cardRating}>
                       xxxx (345)
                      </Typography>
                      <Typography className={styles.cardPrice}>
                      &#x20B9; 457
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card sx={{ maxWidth:250 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image='/pyton.jpg'
                      alt='green iguana'
                    />
                    <CardContent>
                      <Typography className={styles.cardTitle} >
                        The complete sql boothbamp go from zero to hero
                      </Typography>
                      <Typography className={styles.cardInstructor}>
                       jimmy
                      </Typography>
                      <Typography className={styles.cardRating}>
                       xxxx (345)
                      </Typography>
                      <Typography className={styles.cardPrice}>
                      &#x20B9; 457
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item md={3}>
                <Card sx={{ maxWidth:250 }}>
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='140'
                      image='/pyton.jpg'
                      alt='green iguana'
                    />
                    <CardContent>
                      <Typography className={styles.cardTitle} >
                        The complete sql boothbamp go from zero to hero
                      </Typography>
                      <Typography className={styles.cardInstructor}>
                       jimmy
                      </Typography>
                      <Typography className={styles.cardRating}>
                       xxxx (345)
                      </Typography>
                      <Typography className={styles.cardPrice}>
                      &#x20B9; 457
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
           
             
            </Grid>
          </Box>
        </Container>
      </div>
    )
  }
  