export default function reducer(state, action) {
    switch (action.type) {
        case "CURRENT_USER":
            return { ...state, user: action.payload };
        case "LOG_OUT":
            return { ...state, user: null };
        case "GET_ALL_STUDENTS":
            return { ...state, students: [...action.payload] };
        case "CREATE_ONE_STUDENT":
            return { ...state, students: [...state.students, action.payload] };
        case "UPDATE_ONE_STUDENT":
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload._id
                        ? { ...student, ...action.payload }
                        : student
                ),
            };
        case "DELETE_ONE_STUDENT":
            return {
                ...state,
                students: state.students.filter(
                    (student) => student._id !== action.payload._id
                ),
            };
        default:
            return state;
    }
}
