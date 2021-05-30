import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
  ]).then(([users]) => ({
    users,
  }))
}

export function getQuestions () {
  return Promise.all([
    _getQuestions(),
  ]).then(([questions]) => ({
    questions,
  }))
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}

export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}