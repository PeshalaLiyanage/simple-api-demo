import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            navigate("/");
        }
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/todo', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("accessToken")
                }
            });
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        sessionStorage.removeItem("accessToken")
        navigate("/")
    };

    return (
        <>
            <div className="dashboard-page">
                <h2>Welcome to the Dashboard!</h2>
                <p>This is your protected dashboard content.</p>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <button onClick={fetchTodos} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Todos'}
                </button>
                <ul>
                    {todos?.map(todo => (
                        <li key={todo.id}>{todo.title}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default DashboardPage;
