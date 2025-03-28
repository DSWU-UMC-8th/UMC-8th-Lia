/*import './App.css'
import Todo from "./components/Todo"
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}


export default App*/

import './App.css'
import ContextPage from "./06-useContext/ContextPage";
import { ThemeProvider } from "../src/06-useContext/context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <ContextPage />
    </ThemeProvider>
  );
}

export default App;
