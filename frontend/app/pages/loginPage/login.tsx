"use client"

import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import React from "react"
import styles from "./page.module.css"
import { Google, KeyboardArrowRight } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch,useSelector } from "react-redux"
import { loginAction } from "@/app/redux/features/userSlice/loginSlice"
import { AppDispatch, RootState } from "@/app/redux/store"

const MainBox = styled("div")(({ theme }) => ({
  display: "flex",
  height: "90vh",
  justifyContent: "center",
  alignItems: "center",
}))

const FirstBox = styled("div")(({ theme }) => ({
  width: "400px",
  height: "650px",
  backgroundColor: "#393E46",
  borderTopLeftRadius: "20px",
  borderEndStartRadius: "20px",
  boxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  WebkitBoxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  MozBoxShadow: " 5px 4px 5px 0px rgba(0,0,0,0.64)",
}))

const SecondBox = styled("div")(({ theme }) => ({
  width: "700px",
  height: "650px",
  boxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  WebkitBoxShadow: "5px 4px 5px 0px rgba(0,0,0,0.64)",
  MozBoxShadow: " 5px 4px 5px 0px rgba(0,0,0,0.64)",
  borderTopRightRadius: "20px",
  borderEndEndRadius: "20px",
}))

const Title = styled("div")(({ theme }) => ({}))

const Forms = styled("form")(({ theme }) => ({
  paddingTop: "20px",
  paddingLeft: "30px",
  width: "30rem",
}))

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}))

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const dispatch:AppDispatch = useDispatch() 
  const router = useRouter()

  const loginUser = useSelector<RootState,{user:null,error:unknown,loading:boolean}>((state)=> state.loginUser)
  const {user,error,loading} = loginUser

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(loginAction({email,password}))
  }

  React.useEffect(()=>{
  if(user){
   router.push('/')
  }
  },[user,router])

  
  return (
    <MainBox>
      
      <FirstBox>
        <div className={styles.logoContainer}>
          <img
            src='/logo.png'
            alt='logo'
            width={160}
            height={60}
            className={styles.logo}
          />
        </div>
        <div className={styles.imageContainer}>
          <img src='/image1.png' alt='study img' className={styles.image} />
        </div>
        <div className={styles.loginContainer}>
          <Link href='/pages/registerPage' passHref>
            <Button variant='contained' endIcon={<KeyboardArrowRight />}>
              Sign up
            </Button>
          </Link>
        </div>
      </FirstBox>
      <SecondBox>
        <Title>
          <Typography className={styles.pageTitle}>
            Sign in with your Account
          </Typography>
        </Title>
        <Typography className={styles.desc}>
          Fill out the form to sign in
        </Typography>
        <div className={styles.authImageContainer}>
          <img src='/auth.png' alt='auth img' className={styles.authImage} />
        </div>

        <Forms onSubmit={handleSubmit}>
        {error ? <p style={{paddingBottom:'12px',color:'red'}}>{error as string}</p> : ""}
        
          <Typography className={styles.label}>Enter your email *</Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='example@gmail.com'
            type='email'
            fullWidth
            className={styles.textField}
          />
          <Typography className={styles.label}>
            Enter your password *
          </Typography>
          <TextField
            type='password'
            fullWidth
            className={styles.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <Button className={styles.button} variant='contained' type="submit">
               {loading ? 'Loading...' : 'Sign in'}
            </Button>
          </div>
          <Typography
            style={{
              textAlign: "center",
              paddingBottom: "10px",
              fontWeight: "bold",
            }}
          >
            OR
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            Continue with -
          </Typography>
          <Icons>
            <IconButton>
              <Google className={styles.googleIcon} />
            </IconButton>
          </Icons>
        </Forms>
      </SecondBox>
    </MainBox>
  )
}