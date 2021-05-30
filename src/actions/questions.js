import { hideLoading, showLoading } from "react-redux-loading";
import { getQuestions } from "../utils/api";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

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
