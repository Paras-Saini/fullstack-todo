import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteTodoApi,
  retrieveAllTodosForUsernameApi,
} from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const [message, setMessage] = useState(null);

  const authContext = useAuth();

  const username = authContext.username;

  const navigate = useNavigate();

  /* const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDay()
  ); */

  useEffect(() => refreshTodos(), []);

  const refreshTodos = () => {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id) => {
    console.log(id);
    deleteTodoApi(username, id)
      .then(() => {
        setMessage(`Delete of todo with id= ${id} is successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  };

  const updateTodo = (id) => {
    console.log(id);
    navigate(`/todo/${id}`);
  };

  const addNewTodo = () => {
    navigate("/todo/-1");
  };

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-3" onClick={addNewTodo}>
        Add New Todo
      </div>
    </div>
  );
};

export default ListTodos;
