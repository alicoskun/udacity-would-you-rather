import { hideLoading, showLoading } from "react-redux-loading";
import { getQuestions, saveQuestion } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';

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

function setQuestionAnswer(question) {
  return {
    type: SET_QUESTION_ANSWER,
    question
  };
}

export function handleSetQuestionAnswer(answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      answer,
      author: authedUser
    })
      .then((question) => dispatch(setQuestionAnswer(question)))
      .then(() => dispatch(hideLoading()));
  };
}
