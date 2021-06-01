import { hideLoading, showLoading } from "react-redux-loading";
import { getQuestions, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addUserQuestion, setUserAnswer } from "./users";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleQuestionData() {
  return (dispatch) => {
    dispatch(showLoading());

    return getQuestions().then(({ questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

function setQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SET_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export function handleSetQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(setQuestionAnswer(info));
    dispatch(setUserAnswer(info));

    return saveQuestionAnswer(info)
      .then(() => dispatch(hideLoading()));
  };
}

function addNewQuestion(question) {
  return {
    type: ADD_NEW_QUESTION,
    question
  };
}

export function handleAddNewQuestion(info) {
  return (dispatch) => {
    dispatch(showLoading());

    return saveQuestion(info)
      .then((question) => {
        dispatch(addNewQuestion(question))
        dispatch(addUserQuestion(question))
      })
      .then(() => dispatch(hideLoading()));
  };
}
