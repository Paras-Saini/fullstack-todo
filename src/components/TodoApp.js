import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";

import Login from "./Login";
import Logout from "./Logout";
import Footer from "./Footer";
import Header from "./Header";
import Welcome from "./Welcome";
import ListTodos from "./ListTodos";
import Error from "./Error";
import { AuthProvider, useAuth } from "../security/AuthContext";
import Todo from "./Todo";

const AuthenticatedRoute = ({ children }) => {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  return <Navigate to="/" />;
};

const TodoApp = () => {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<Error />}></Route>
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <Todo />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout />
                </AuthenticatedRoute>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default TodoApp;
