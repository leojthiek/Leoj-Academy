import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Course } from "../entities/courseEntity"
import { User } from "../entities/UserEntity"
import { CoursePurchase } from "../entities/CoursePurchaseEntity"

interface userRequest extends Request{
  user:User
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
      res.status(200).json({course:topCourse})
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

    const  coursePurchaseRepo = AppDataSource.getRepository(CoursePurchase)
    const coursePurchase = await coursePurchaseRepo.findOne({where:{user:{id:userId},course:{id:courseId},isPaid:true}})

    if(coursePurchase){
      const course = {courseDetail,coursePurchase}
      res.status(200).json({course:course})
    }else{
      res.status(400).json({errors:'course not purchase'})
    }

  
  } catch (error) {
    console.log("error", error)
    res.status(400).json({ errors: "failed to retrive course details" })
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
        order:{
          rating:'DESC'
        },
        take: 4,
      });

      if (courseWithSameInstructor) {
        res.status(200).json({instructorCourse:courseWithSameInstructor});
      } else {
        res.status(400).json({errors:'Course not found'});
      }
    } else {
      res.status(400).json({errors:'Course not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong with the server' });
  }
};

// GET TOP RATED 4 COURSE WITH SAME CATEGORY  

const getCourseWithSameCategory = async (req: Request, res: Response) => {

  try {
    const courseId = req.params.id;
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({ where: { id: courseId } });

    if (course) {
      const categoryName = course.course_category;
      const courseWithSameCategory = await courseRepository.find({
        where: {
          course_category: categoryName,
        },
        order:{
          rating:'DESC'
        },
        take: 4,
      });

      if (courseWithSameCategory) {
        res.status(200).json({courseCategory:courseWithSameCategory});
      } else {
        res.status(400).json({errors:'Course not found'});
      }
    } else {
      res.status(400).json({errors:'Course not found'});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ errors: 'Something went wrong with the server' });
  }
};

// const getCoursePurchase = async (req: userRequest, res: Response) => {

//   try {
//     const courseId = req.params.id;
//     const userId= req.user.id

//     const coursePurchaseRepo = AppDataSource.getRepository(CoursePurchase);
//     const course = await coursePurchaseRepo.findOne({ where: {user:{id:userId},course:{id:courseId},isPaid:true}});

//     if(!course){
//       return res.status(200).json({errors:'course not purchase'})
//     }

//     res.status(200).json({course:course})

    
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ errors: 'Something went wrong with the server,while fetching coursePurchase' });
//   }
// };


export { createCourse, getTopCourse, getCourseDetails,getCourseWithSameInstructor,getCourseWithSameCategory,getCoursePurchaseDetail}
