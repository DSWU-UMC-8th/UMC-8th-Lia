import { useState, FormEvent } from "react";
import { TTodo as TodoType } from "../types/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [doneTodos, setDoneTodos] = useState<TodoType[]>([]);
  const [input, setInput] = useState<string>("");

  

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();


    const text = input.trim();
    if (text) {
      const newTodo: TodoType = {
        id: Date.now(),
        text,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TodoType): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TodoType): void => {
    setDoneTodos((prevDoneTodos) =>
      prevDoneTodos.filter((t) => t.id !== todo.id)
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">LIA TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        {/* 할 일 섹션 */}
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-List" className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => completeTodo(todo)}
                  style={{ backgroundColor: "#28a745" }}
                  className="render-container__item-button"
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 완료된 일 섹션 */}
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-List" className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  style={{ backgroundColor: "#dc3545" }}
                  className="render-container__item-button"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
