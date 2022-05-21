import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AppContext from "./AppContext";

export default function ListItem({ student, index }) {
    const { dispatch } = useContext(AppContext);
    let navigate = useNavigate();
    const handleClick = () => {
        return navigate(`/students/${student._id}`);
    };
    const deleteStudent = async (e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem("token");
            const option = {
                method: "delete",
                url: `/students/${student._id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios(option);
            dispatch({ type: "DELETE_ONE_STUDENT", payload: student });
        } catch (error) {}
    };
    return (
        <li className="item" onClick={() => handleClick()}>
            <div className="index">{index}</div>
            <div className="id">{student._id}</div>
            <div className="name">{student.name}</div>
            <div className="code">{student.code}</div>
            <div className="class">{student.class}</div>
            <div className="home">{student.home}</div>
            <div className="all">
                <button
                    type="button"
                    onClick={(e) => deleteStudent(e)}
                    className="btn border"
                >
                    Xóa
                </button>
            </div>
        </li>
    );
}
