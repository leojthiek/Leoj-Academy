"use client"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"
import styles from "./page.module.css"

export default function CourseContent() {
  return (
    <div className={styles.main}>
      <Container>
        <Typography className={styles.mainTitle}>Course content :</Typography>
        <hr />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Chapter1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionSummary>
            <Typography>content1</Typography>
            </AccordionSummary>
            <AccordionSummary>
            <Typography>content1</Typography>
            </AccordionSummary>
          </AccordionDetails>
          
        </Accordion>
        <Accordion>
          <AccordionSummary
          className={styles.chapterContainer}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={styles.chapterName}>Chapter1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionSummary>
            <Typography className={styles.contentName}>content1</Typography>
            </AccordionSummary>
            <AccordionSummary>
            <Typography>content1</Typography>
            </AccordionSummary>
          </AccordionDetails>
          
        </Accordion>
      </Container>
    </div>
  )
}
