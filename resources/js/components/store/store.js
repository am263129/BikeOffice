import { createStore } from "react-hooks-global-state";

export const { dispatch, useGlobalState } = createStore(
    (state, action) => {
        switch (action.type) {
            case "setAuth":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        auth: action.auth,
                    },
                };
            case "setRole":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        role: action.role,
                    },
                };
            case "setId":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        id: action.id,
                    },
                };
            case "setName":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        name: action.name,
                    },
                };
            case "setEmail":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: action.email,
                    },
                };
            case "setGender":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        gender: action.gender,
                    },
                };
            case "setImage":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        image: action.image,
                    },
                };
            case "setPhone":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        phone: action.phone,
                    },
                };
            case "setToken":
                return {
                    ...state,
                    token: action.token,
                };
            default:
                return state;
        }
    },
    {
        user: {
            name: "",
            gender: "male",
            email: "",
            image: null,
            phone: "",
            id: null,
            auth: false,
            role:"",
        },
        token: "",
    }
);
