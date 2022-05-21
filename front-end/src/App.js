import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppReducer from "./reducers/AppReducer";
import { useReducer, useCallback, useEffect } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";

function App() {
    const [state, dispatch] = useReducer(AppReducer, {
        user: null,
        students: [],
    });
    const checkCurrentUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const option = {
                method: "get",
                url: "/auth/",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios(option);
            if (res.data.data.user) {
                const { username } = res.data.data.user;
                dispatch({ type: "CURRENT_USER", payload: username });
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser]);

    return (
        <Router>
            <AppContext.Provider value={{ state, dispatch }}>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route element={<ProtectedRoute user={state.user} />}>
                            <Route path="/students" element={<List />} />
                            <Route path="/form" element={<Form />} />
                            <Route
                                path="/students/:studentId"
                                element={<Form />}
                            />
                        </Route>
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </div>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
