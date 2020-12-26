const route = require('express').Router()
const StudentController = require('../controllers/Student')
const TeacherController = require('../controllers/Teacher')
const Auth = require('../middlewares/auth')
const generateCode = require('../middlewares/generateCode')


route.post("/register/:code", Auth.getIdFromRegistrationCode, StudentController.register)
route.post("/login", StudentController.login)
route.get("/lessons/:TeacherId", StudentController.getLessons)
//route.get("/lessons/:lessonId", StudentController.getCourse)
route.get("/quiz/:CourseId", StudentController.getQuiz)
route.get("/questions/:QuizId", StudentController.getQuestion)
route.get("/scores/:StudentId", StudentController.getScore)
route.get("/students/:TeacherId", StudentController.getStudents)

route.post("/teacher/register", TeacherController.teacherRegister)
route.post("/teacher/login", TeacherController.teacherLogin)
route.post("/lessons", Auth.authentication, TeacherController.createLesson)
route.post("/courses", TeacherController.createCourse)
route.post("/quizzes/:CourseId", TeacherController.createQuiz)
route.post("/questions/:QuizId", TeacherController.createQuestion)
route.get("/courses/:LessonId", TeacherController.getCourseByLessonId)
route.get("/registrationcode", Auth.authentication, generateCode, TeacherController.getRegistrationCodeForStudent)
route.get("/quizzes", TeacherController.getQuizzesIncludeCourse)
route.get("/lessons", Auth.authentication, TeacherController.getLesson)
route.get("/students", Auth.authentication, TeacherController.getStudent)


module.exports = route
