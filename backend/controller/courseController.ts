import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Course } from "../entities/CourseEntity"
import { User } from "../entities/UserEntity"
import { CoursePurchase } from "../entities/CoursePurchaseEntity"
import { Chapters } from "../entities/ChapterEntity"
import { v2 as cloudinary } from "cloudinary"

interface userRequest extends Request {
  user: User
}

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
    } = req.body;

    const imageBase64 = Array.isArray(course_image) ? course_image[0] : course_image;
    
   if(imageBase64){
    const uploadRes = await cloudinary.uploader.upload(imageBase64,{
      upload_preset:"second-project"
    })
    if(uploadRes){
      const course = new Course({
        course_name,
        course_category,
        course_description,
        course_image:uploadRes.secure_url,
        course_instructor,
        course_price,
        rating,
        numOfReviews,
      });
  
      await AppDataSource.manager.save(course);
  
      return res.json({ course: course });
    }
   }

  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ errors: "server error while creating course,please try again" });
  }
};

//  CREATE CHAPTERS COURSE

const createChaters = async (req: Request, res: Response) => {
  const courseId = req.params.id
  try {
    const { Chapter_title, Chapter_description } = req.body

    if (Chapter_title === "") {
      return res.status(400).json({ errors: "chapter title cannot be empty" })
    }

    const courseRepository = AppDataSource.getRepository(Course)
    const course = await courseRepository.findOne({ where: { id: courseId } })

    if (!course) {
      return res.status(400).json({ error: "course not found" })
    }

    const chapters = new Chapters({
      Chapter_title,
      Chapter_description,
      course,
    })

    await AppDataSource.manager.save(chapters)

    res.status(200).json({ chapters: chapters })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      errors: "something went wrong while creating chapter, please try again",
    })
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
      res.status(200).json({ course: topCourse })
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

// GET COURSE LATEST CREATED

const getOneLatestCreatedCourse = async (req: Request, res: Response) => {
  try {
    const courseRepository = AppDataSource.getRepository(Course)
    const getLatest = await courseRepository.find({
      order: {
        createAt: "DESC",
      },
      take: 1,
    })
    if (getLatest) {
      res.status(200).json({ course: getLatest })
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
      return res.status(400).json({ errors: "course details not found" })
    }

    res.status(200).json({ course: courseDetail })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ errors: "failed to retrive course details" })
  }
}


// GET ALL CHAPTER FROM SPECIFIC COURSE

const getCourseChapter = async (req: Request, res: Response) => {
  const courseId = req.params.id
  try {
    const courseRepository = AppDataSource.getRepository(Course)
    const chapters = await courseRepository.findOne({
      where: { id: courseId },
      relations: ["chapter"],
    })

    if (!chapters) {
      return res.status(400).json({ errors: "course details not found" })
    }

    res.status(200).json({ course: chapters })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ errors: "failed to retrive course details" })
  }
}


const getCoursePurchaseDetail = async (req: userRequest, res: Response) => {
  const userId = req.user.id
  const courseId = req.params.id
  try {
    const courseRepository = AppDataSource.getRepository(Course)
    const courseDetail = await courseRepository.findOne({
      where: { id: courseId },
      relations: ["chapter", "chapter.content"],
    })

    if (!courseDetail) {
      return res.status(400).json({ errors: "course details not found" })
    }

    const coursePurchaseRepo = AppDataSource.getRepository(CoursePurchase)
    const coursePurchase = await coursePurchaseRepo.findOne({
      where: { user: { id: userId }, course: { id: courseId }, isPaid: true },
    })

    if (coursePurchase) {
      const course = { courseDetail, coursePurchase }
      res.status(200).json({ course: course })
    } else {
      res.status(400).json({ errors: "course not purchase" })
    }
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ errors: "failed to retrive course details" })
  }
}

// GET COURSE UNDER SPECIFIC INSTRUCTOR

const getCourseWithSameInstructor = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id
    const courseRepository = AppDataSource.getRepository(Course)
    const course = await courseRepository.findOne({ where: { id: courseId } })

    if (course) {
      const instructorName = course.course_instructor
      const courseWithSameInstructor = await courseRepository.find({
        where: {
          course_instructor: instructorName,
        },
        order: {
          rating: "DESC",
        },
        take: 4,
      })

      if (courseWithSameInstructor) {
        res.status(200).json({ instructorCourse: courseWithSameInstructor })
      } else {
        res.status(400).json({ errors: "Course not found" })
      }
    } else {
      res.status(400).json({ errors: "Course not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Something went wrong with the server" })
  }
}

// GET TOP RATED 4 COURSE WITH SAME CATEGORY

const getCourseWithSameCategory = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id
    const courseRepository = AppDataSource.getRepository(Course)
    const course = await courseRepository.findOne({ where: { id: courseId } })

    if (course) {
      const categoryName = course.course_category
      const courseWithSameCategory = await courseRepository.find({
        where: {
          course_category: categoryName,
        },
        order: {
          rating: "DESC",
        },
        take: 4,
      })

      if (courseWithSameCategory) {
        res.status(200).json({ courseCategory: courseWithSameCategory })
      } else {
        res.status(400).json({ errors: "Course not found" })
      }
    } else {
      res.status(400).json({ errors: "Course not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ errors: "Something went wrong with the server" })
  }
}

export {
  createCourse,
  getTopCourse,
  getCourseDetails,
  getCourseWithSameInstructor,
  getCourseWithSameCategory,
  getCoursePurchaseDetail,
  createChaters,
  getOneLatestCreatedCourse,
  getCourseChapter
}
