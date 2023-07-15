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
import { registerUserAction } from "@/app/redux/featuresSlice/userSlice/registerSlice"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/app/redux/store"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
  paddingTop: "50px",
  paddingLeft: "30px",
  width: "40rem",
}))

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}))

export default function RegisterPage() {
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  const registerUser = useSelector<
    RootState,
    { user: null; error: unknown; loading: boolean }
  >((state) => state.registerUser)
  const { user, error, loading } = registerUser
  console.log(error)

  React.useEffect(() => {
    if (user) {
      router.push("/pages/LoginPage")
    }
  }, [user, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUserAction({ username, email, password }))
  }

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
          <Link href='/pages/LoginPage'>
            <Button variant='contained' endIcon={<KeyboardArrowRight />}>
              Sign in
            </Button>
          </Link>
        </div>
      </FirstBox>
      <SecondBox>
        <Title>
          <Typography className={styles.title}>Create an account</Typography>
        </Title>
        <Typography className={styles.desc}>
          Fill out the form to get started
        </Typography>

        <Forms onSubmit={handleSubmit}>
          {error ? <p style={{ color: "red" }}>{error as string}</p> : null}
          <TextField
            required
            label='Enter your username *'
            variant='outlined'
            type='text'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.textField}
          />
          <TextField
            required
            label='Enter your email *'
            variant='outlined'
            type='email'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textField}
          />

          <TextField
            required
            label='Enter your password'
            variant='outlined'
            type='password'
            fullWidth
            className={styles.textField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            required
            label='Confirm your password'
            variant='outlined'
            type='password'
            fullWidth
            className={styles.textField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <Button className={styles.button} variant='contained' type='submit'>
              {loading ? <Typography>loading...</Typography> : "Sign up"}
            </Button>
          </div>
        </Forms>
        <Typography
          style={{
            textAlign: "center",
            paddingBottom: "10px",
            fontWeight: "bold",
          }}
        >
          OR
        </Typography>
        <Typography style={{ textAlign: "center" }}>Continue with -</Typography>
        <Icons>
          <IconButton>
            <Google className={styles.googleIcon} />
          </IconButton>
        </Icons>
      </SecondBox>
    </MainBox>
  )
}
