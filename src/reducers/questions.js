import { ADD_NEW_QUESTION, RECEIVE_QUESTIONS, SET_QUESTION_ANSWER } from '../actions/questions';

export default function questions(state = null, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SET_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: Array.from(
              new Set(
                state[action.qid][action.answer].votes.concat([action.authedUser])
              )
            ),
          },
        },
      };
    case ADD_NEW_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };

    default:
      return state;
  }
}
