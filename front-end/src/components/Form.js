import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Form.css";
import axios from "axios";
import AppContext from "./AppContext";

export default function Form() {
    const { studentId } = useParams();
    const { dispatch } = useContext(AppContext);
    const [student, setStudent] = useState({});
    let navigate = useNavigate();
    const getStudent = async () => {
        try {
            if (studentId) {
                const token = localStorage.getItem("token");
                const option = {
                    method: "get",
                    url: `/students/${studentId}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await axios(option);
                setStudent(res.data.data.student);
            }
        } catch (error) {}
    };
    useEffect(() => {
        getStudent();
    }, []);

    const createStudent = async (e) => {
        try {
            const token = localStorage.getItem("token");

            const option = {
                method: "post",
                url: `/students/${student._id}`,
                data: student,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios(option);
            dispatch({
                type: "CREATE_ONE_STUDENT",
                payload: res.data.data.student,
            });
            cancelForm();
        } catch (error) {
            console.log(error.res);
        }
    };
    const updateStudent = async (e) => {
        try {
            const token = localStorage.getItem("token");

            const option = {
                method: "put",
                url: `/students/${studentId}`,
                data: student,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios(option);
            dispatch({
                type: "UPDATE_ONE_STUDENT",
                payload: res.data.data.student,
            });
            cancelForm();
        } catch (error) {
            console.log(error.res);
        }
    };
    const cancelForm = () => {
        return navigate("/students");
    };
    return (
        <section className="form-section border">
            <form className="form" action="">
                <span style={{ width: "15%" }}>
                    <label htmlFor="id-input">ID</label>
                    <input
                        type="text"
                        id="id-input"
                        className="input"
                        value={student._id || ""}
                        disabled={studentId ? true : false}
                        onChange={(e) =>
                            setStudent({ ...student, _id: e.target.value })
                        }
                        required
                    />
                </span>
                <span style={{ width: "60%" }}>
                    <label htmlFor="name-input">Tên</label>
                    <input
                        type="text"
                        id="name-input"
                        className="input"
                        placeholder="Nguyễn Văn A"
                        value={student.name || ""}
                        onChange={(e) =>
                            setStudent({ ...student, name: e.target.value })
                        }
                        required
                    />
                </span>
                <span id="code" style={{ width: "25%" }}>
                    <label htmlFor="code-input">MSSV</label>
                    <input
                        type="text"
                        id="code-input"
                        className="input"
                        placeholder="20000002"
                        value={student.code || ""}
                        onChange={(e) =>
                            setStudent({ ...student, code: e.target.value })
                        }
                        required
                    />
                </span>
                <span id="class" style={{ width: "20%" }}>
                    <label htmlFor="class-input">Lớp</label>
                    <input
                        type="text"
                        id="class-input"
                        className="input"
                        placeholder="K60CE"
                        value={student.class || ""}
                        onChange={(e) =>
                            setStudent({ ...student, class: e.target.value })
                        }
                        required
                    />
                </span>
                <span id="home" style={{ width: "80%" }}>
                    <label htmlFor="home-input">Quê</label>
                    <input
                        type="text"
                        id="home-input"
                        className="input"
                        placeholder="Ghi rõ địa chỉ nhà"
                        value={student.home || ""}
                        onChange={(e) =>
                            setStudent({ ...student, home: e.target.value })
                        }
                        required
                    />
                </span>
                {!studentId ? (
                    <button
                        type="button"
                        id="submit"
                        className="btn border"
                        style={{ margin: "auto" }}
                        onClick={(e) => createStudent(e)}
                    >
                        Tạo mới
                    </button>
                ) : (
                    <button
                        type="button"
                        id="submit"
                        className="btn border"
                        style={{ margin: "auto" }}
                        onClick={(e) => updateStudent(e)}
                    >
                        Cập nhật
                    </button>
                )}
                <button
                    type="button"
                    id="submit"
                    className="btn border"
                    style={{ margin: "auto" }}
                    onClick={() => cancelForm()}
                >
                    Hủy bỏ
                </button>
            </form>
        </section>
    );
}
