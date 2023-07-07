"use client"

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { BsCartFill } from "react-icons/bs"
import styles from "./page.module.css"

export default function NavbarComponent() {
  return (
    <Navbar expand='lg' className={styles.main}>
      <Container fluid>
        <Navbar.Brand href='#'>
          <Image
            src='/logo.png'
            alt='leojacadem-logo'
            width={100}
            height={40}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
            <Form className='d-flex mx-4'>
              <Form.Control
                type='search'
                placeholder='Search Courses...'
                className='me-2'
                aria-label='Search'
              />
              <Button className={styles.button} variant='outline-danger'>Search</Button>
            </Form>
          <div className={styles.right}>

            <Link className={styles.text} href='#'>About</Link>
            <Link  className={styles.text} href='#action1'>Courses</Link>
            <Link className={styles.text} href='#action2'>
              <BsCartFill />
            </Link>
            <Link className={styles.text} href='#action2'>Sign In</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
