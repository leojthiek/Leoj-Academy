"use client"

import React from "react";
import { useRouter } from "next/router";



export default function courseDetail() {

  const router = useRouter()
  const {courseId} = router.query

  return (
    <div>
      <h2>{courseId}</h2>
    </div>
  )
}
