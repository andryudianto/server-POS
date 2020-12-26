const { Student, Teacher, Lesson, Course, Quiz, Question } = require ('../models')
const bcryptjs = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

class TeacherController {
    static teacherRegister ( req, res, next ){
        const { name, address, birthdate, email, password, role } = req.body
        Teacher
            .create({
                name,
                address,
                birthdate,
                email,
                password,
                role
            })
            .then(teacher => {
                res.status(201).json({ teacher })
            })
            .catch( err => {
                next (err)
            })
    }

    static teacherLogin (req, res, next){
        const { email, password } = req.body
        Teacher
            .findOne({
                where: {
                    email
                }
            })
            .then(data => {
                console.log(data)
                if (!data) {
                    throw {
                        message: `email/password is wrong`
                    }
                } else {
                    const validatePassword = bcryptjs.compareSync(password, data.password)
                    if (validatePassword) {
                        const access_token = jwt.sign({
                            id: data.id,
                            email: data.email
                        }, `secret`)
                        res.status(200).json({ 
                            access_token
                        })
                    } else {
                        throw {
                            message: `email/password is wrong`
                        }
                    }
                }
            })
            .catch( err => {
                next(err)
            })
    }

    static createLesson (req, res, next){
        const { name } = req.body
        const  TeacherId  = req.decoded.id
        Lesson
            .create({
                name,
                TeacherId
            })
            .then( data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static createCourse (req, res, next){
        const { name, materialUrl, LessonId } = req.body
        Course
            .create({
                name,
                materialUrl,
                LessonId
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static createQuiz (req, res, next){
        const { name } = req.body
        const { CourseId } = req.params
        Quiz.create({
                name,
                CourseId
            })
            .then(data => {
                res.status(201).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static createQuestion ( req, res, next ){
        const { question, answer, multipleChoice } = req.body
        const { QuizId } = req.params
        Question.create({
            QuizId,
            question,
            multipleChoice,
            answer
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static getQuestion (req, res, next){
        const { id } = req.params
        Question
            .findOne({
                id
            })
            .then(( { data }) => {
                res.status(200).json(data)
            })
            .catch( err => {
                next(err)
            })
    }

    static editQuestions (req, res, next) {
        const { questions, choices, answer } = req.body
        const { id } = req.params
        Question
            .update({
                questions,
                choices,
                answer
            }, { where: {
                id
            }})
            .then(_ => {
                res.status(200).json({
                    message: `success edit question`
                })
            })
    }

    static deleteQuiz (req, res, next ){
        Quiz
            .destryo({
                where: {
                    teacherId : req.decodedUser.id
                }
            })
            .then(( { data }) => {
                res.status(200).json(data)
            })
            .catch( err => {
                next (err)
            })
    }

    static getCourseByLessonId (req, res, next) {
        const { LessonId } = req.params
        Course.findAll({
            where: {
                LessonId
            }
        })
        .then(courses => {
            res.status(200).json(courses)
        })
        .catch(err => {
            next(err)
        })
    }

    static getRegistrationCodeForStudent(req, res, next) {
        const code = req.code
        res.status(200).json(code)
    }

    static getQuizzesIncludeCourse(req, res, next) {
        Quiz.findAll({
            include: Course
        })
        .then(quizzes => {
            res.status(200).json(quizzes)
        })
        .catch(err => {
            next(err)
        })
    }

    static getLesson(req, res, next) {
        const TeacherId = req.decoded.id
        Lesson.findAll({
            where: {
                TeacherId
            },
            include: Course
        })
        .then(lessons => {
            res.status(200).json(lessons)
        })
        .catch(err => {
            next(err)
        })
    }

    static getStudent(req, res, next) {
        const TeacherId = req.decoded.id
        Student.findAll({
            where: {
                TeacherId
            }
        })
        .then(students => {
            res.status(200).json(students)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TeacherController