import React from "react";
import "../css/Auth.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AppContext from "../components/AppContext";

export default function Auth() {
    const [mode, setMode] = useState(true);
    const [messages, setMessages] = useState();
    const [userInput, setUserInput] = useState({});
    const { state, dispatch } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.user) navigate("/");
    }, [navigate, state.user]);

    const onChangeInput = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const handleAuth = async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: "post",
                url: `/auth/${mode ? "login" : "register"}`,
                data: userInput,
            };
            const res = await axios(option);
            if (mode) {
                const { token, username } = res.data.data;
                localStorage.setItem("token", token);
                dispatch({ type: "CURRENT_USER", payload: username });
                navigate("/");
            } else {
                setMode(() => {
                    setMessages([]);
                    setUserInput({});
                    return !mode;
                });
            }
        } catch (error) {
            const message = error.response.data.message;
            setMessages(message);
        }
    };
    return (
        <section className="auth border">
            <div className="title">{mode ? "Đăng nhập" : "Đăng ký"}</div>
            <form className="form">
                <div className="input-area">
                    <span>
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            className="input"
                            id="username"
                            required
                            onChange={(e) => onChangeInput(e)}
                            value={userInput.username || ""}
                        />
                    </span>
                    <span>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            id="password"
                            onChange={(e) => onChangeInput(e)}
                            value={userInput.password || ""}
                            required
                        />
                    </span>
                </div>
                <div className="notification border">
                    <div className="title2">Thông báo</div>
                    <div className="screen">
                        {messages && <div>{messages}</div>}
                    </div>
                </div>
                <button
                    type="button"
                    className="finish border btn"
                    onClick={(e) => handleAuth(e)}
                >
                    {mode ? "Đăng nhập" : "Đăng ký"}
                </button>
                <button
                    type="button"
                    className="finish border btn"
                    onClick={() =>
                        setMode(() => {
                            setMessages([]);
                            setUserInput({});
                            return !mode;
                        })
                    }
                >
                    Khác
                </button>
            </form>
        </section>
    );
}
