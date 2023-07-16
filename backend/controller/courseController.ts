import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Course } from "../entities/courseEntity"


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
  const courseId = req.params.id
  try {
    const courseRepository = AppDataSource.getRepository(Course)
    const courseDetail = await courseRepository.findOne({
      where: { id: courseId },
      relations: ["chapter", "chapter.content"],
    })

    if (!courseDetail) {
      return res.status(400).json({ error: "course details not found" })
    }
    res.status(200).json({ course: courseDetail })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ error: "failed to retrive course details" })
  }
}

// GET COURSE UNDER SPECIFIC INSTRUCTOR

const getCourseWithSameInstructor = async (req: Request, res: Response) => {


  try {
    const courseId = req.params.id;
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id: courseId } });

    if (course) {
      const instructorName = course.course_instructor;
      const courseWithSameInstructor = await courseRepository.find({
        where: {
          course_instructor: instructorName,
        },
        take: 4,
      });

      if (courseWithSameInstructor) {
        res.status(200).json(courseWithSameInstructor);
      } else {
        res.status(400).json('Courses not found');
      }
    } else {
      res.status(400).json('Course not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong with the server' });
  }
};


export { createCourse, getTopCourse, getCourseDetails,getCourseWithSameInstructor }
