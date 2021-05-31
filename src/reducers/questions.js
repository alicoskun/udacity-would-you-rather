import { RECEIVE_QUESTIONS, SET_QUESTION_ANSWER } from '../actions/questions';

export default function questions(state = null, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SET_QUESTION_ANSWER:
      const { question } = action;

      question.votes = []

      return {
        ...state,
        [action.question.id]: action.question
      };

    default:
      return state;
  }
}
