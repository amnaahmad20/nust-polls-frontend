export const initialState = {
  user: null,
  deadline: null,
  published_on: null,
  is_question_empty: false,
  is_option_empty: false,
  changed: true,
  answers:[]
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_POLL_DATES':
      return{
        ...state,
          deadline:action.deadline,
          published_on:action.published_on,

      }
    case 'SET_IS_EMPTY':
      return{
        ...state,
        is_question_empty:action.is_question_empty,
        is_option_empty:action.is_option_empty,
      }

    case 'SET_IS_CHANGED':
      return{
        ...state,
        changed: action.changed,
      }

    case 'SET_ANSWERS':
      return {
        ...state,
        answers : [
        ...state.answers.slice(0, action.index),
          action.answer,
        ...state.answers.slice(action.index)
    ]
  }
    default:
      return state;
  }
};

export default reducer;
