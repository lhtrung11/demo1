import React from "react";
import ListItem from "./ListItem";
import "../css/List.css";
import axios from "axios";
import { useEffect, useCallback, useContext } from "react";
import AppContext from "./AppContext";

export default function List() {
    const { state, dispatch } = useContext(AppContext);
    const { students } = state;
    const getAllStudents = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const option = {
                method: "get",
                url: "/students",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios(option);
            const students = response.data.data.students;
            dispatch({ type: "GET_ALL_STUDENTS", payload: students });
        } catch (error) {}
    }, [dispatch]);
    useEffect(() => {
        getAllStudents();
    }, [getAllStudents]);
    return (
        <section className="list border">
            <div className="titles">
                <div className="tit index">STT</div>
                <div className="tit id">ID</div>
                <div className="tit name">Họ và tên</div>
                <div className="tit code">MSSV</div>
                <div className="tit class">Lớp</div>
                <div className="tit home">Quê quán</div>
                <div className="tit all">Thao tác</div>
            </div>
            <ul className="content">
                {students.map((student, index) => (
                    <ListItem
                        student={student}
                        index={index + 1}
                        key={student._id}
                    />
                ))}
            </ul>
        </section>
    );
}
