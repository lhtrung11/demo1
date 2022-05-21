import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import AppContext from "./AppContext";
import { useContext, useState } from "react";

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const username = state.user;
    const [display, setDisplay] = useState(true);
    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOG_OUT", payload: null });
    };
    return (
        <header className="header border">
            <div className="nav">
                <div className="home">
                    <Link to="/" className="home-page">
                        Trang chủ
                    </Link>
                </div>
                <div className="other">
                    <ul className="dropdown">
                        <li>
                            <Link to="/students">Danh sách</Link>
                        </li>
                        <li>
                            <Link to="/form">don</Link>
                        </li>
                        <li>
                            {username ? (
                                <>
                                    <span
                                        className={`username ${
                                            display ? "" : "nodisplay"
                                        }`}
                                        onMouseEnter={() => setDisplay(false)}
                                    >
                                        {username}
                                    </span>
                                    <span
                                        className={`username ${
                                            display ? "nodisplay" : ""
                                        }`}
                                        onMouseLeave={() => setDisplay(true)}
                                        onClick={() => handleLogout()}
                                    >
                                        Đăng xuất
                                    </span>
                                </>
                            ) : (
                                <Link to="/auth">Xác minh</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
