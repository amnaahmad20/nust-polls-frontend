export const initialState = {
    user: null,
    deadline: null,
    published_on: null,
    is_question_empty: false,
    is_option_empty: false,
    changed: true,
    is_questions_unfilled: true,
    submit: false,
    answers: []
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, user: action.user,
            };
        case 'SET_POLL_DATES':
            return {
                ...state, deadline: action.deadline, published_on: action.published_on,

            }
        case 'SET_IS_EMPTY':
            return {
                ...state, is_question_empty: action.is_question_empty, is_option_empty: action.is_option_empty,
            }

        case 'SET_IS_CHANGED':
            return {
                ...state, changed: action.changed,
            }

        case 'SET_IS_QUESTION_UNFILLED':
            return {
                ...state, is_questions_unfilled: action.is_questions_unfilled
            }

        case 'SET_ANSWERS':
            return {
                ...state,
                answers: action.answers && state.answers[action.index] == null ?
                    [...state.answers.slice(0, action.index), action.answer, ...state.answers.slice(action.index)]
                    :
                    [...state.answers.slice(0, action.index), action.answer, ...state.answers.slice(action.index + 1)],
            }

        case 'SUBMIT':
            return {
                ...state, submit: action.submit
            }

        default:
            return state;
    }
};

export default reducer;
