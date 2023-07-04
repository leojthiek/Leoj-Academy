import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/UserEntity"
import { Course } from "../entities/courseEntity"

import { validate } from "class-validator"

import initializeDataSource from "../utils/inititialisedDataSource"

//  @ CREATING A COURSE

const createCourse = async (req: Request, res: Response) => {
  try {
    const {
      course_name,
      course_description,
      course_price,
      course_category,
      course_instructor,
      course_image,
      rating,
      numOfReviews,
    } = req.body

    await initializeDataSource()

    const course = new Course({
      course_name,
      course_category,
      course_description,
      course_image,
      course_instructor,
      course_price,
      rating,
      numOfReviews,
    })

    await AppDataSource.manager.save(course)

    return res.json(course)
  } catch (error) {
    console.log(error)
  }
}

// GET 4 TOP COURSE

const getTopCourse = async (req: Request, res: Response) => {
  await initializeDataSource()
  try {
    const courseRepository = AppDataSource.getRepository(Course)
    const topCourse = await courseRepository.find({
      order: {
        rating: "DESC",
      },
      take: 4,
    })
    if (topCourse) {
      res.status(200).json(topCourse)
    } else {
      res.status(400).json({ errors: "courses not found" })
    }
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .json({ error: "Something is wrong with the server please try again" })
  }
}

// GET  COURSE DETAILS

const getCourseDetails = async (req: Request, res: Response) => {
  await initializeDataSource()
   const courseId = req.params.id
try {
   const courseRepository = AppDataSource.getRepository(Course)
   const courseDetail = await courseRepository.findOne({where:{id:courseId},relations:['chapter','chapter.content']})

   if(!courseDetail){
    return res.status(400).json({error:'course details not found'})
   }
   res.status(200).json({course:courseDetail})
} catch (error) {
  console.log('error',error)
  res.status(400).json({error:'failed to retrive course details'})
}
}

export { createCourse, getTopCourse ,getCourseDetails}
