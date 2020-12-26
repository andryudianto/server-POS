const { Student, Lesson, Quiz, Course, Question } = require('../models')
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const createError = require('http-errors')

class StudentController{
    static register(req, res, next) {
        const TeacherId  = Number(req.TeacherId)
        console.log(TeacherId)
        const { name, address, birthdate, email, password } = req.body
        Student.create({
            name, address, birthdate, email, password, TeacherId
        })
        .then(student => {
            res.status(201).json({student})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        Student.findOne({
            where: {email}
        })
        .then(student => {
            if (!student) {
                throw createError(400, "invalid email / password")
            } else {
                const validPassword = bcryptjs.compareSync(password, student.password)

                if (!validPassword) {
                    throw createError(400, "invalid email / password")
                }
                const access_token = jwt.sign({
                    id: student.id,
                    email: student.email
                }, process.env.JWT_SECRET)

                res.status(200).json({
                    access_token,
                    email: student.email,
                    name: student.name,
                    TeacherId: student.TeacherId,
                    id: student.id
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static getLessons(req, res, next) {
        const { TeacherId } = req.params
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

    static getCourse(req, res, next) {
        const { lessonId } = req.params
        Lesson.findOne({
            where: {
                id: lessonId
            }
        })
        .then(lesson => {
            res.status(200).json(lesson)
        })
        .catch(err=> {
            next(err)
        })
    }

    static getQuiz(req, res, next) {
        const { CourseId } = req.params
        Quiz.findAll({
            where: {
                CourseId
            }
        })
        .then(quiz => {
            res.status(200).json(quiz)
        })
        .catch(err => {
            next(err)
        })
        
    }

    static getQuestion(req, res, next) {
        const { QuizId } = req.params
        Question.findAll({
            where: {
                QuizId
            }
        })
        .then(quizs => {
            res.status(200).json(quizs)
        })
        .catch(err => {
            next(err)
        })

    }

    static getScore(req, res, next) {
        const { StudentId } = req.params
        Score.findAll({
            where: {
                StudentId
            }
        })
        .then(scores => {
            res.status(200).json(scores)
        })
        .catch(err => {
            next(err)
        })
    }

    static getStudents(req, res, next) {
        const { TeacherId } = req.params
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

module.exports = StudentController