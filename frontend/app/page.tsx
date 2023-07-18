import Image from "next/image"
import styles from "./page.module.css"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      <Link href='/pages/registerPage'>
        <button>link to register</button>
      </Link>
    </div>
  )
}
