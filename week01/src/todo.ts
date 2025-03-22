type Todo = {
    id: number;
    text: string;
  };
  
  let todos: Todo[] = [];
  let doneTasks: Todo[] = [];
  
  const todoInput = document.getElementById('todo-input') as HTMLInputElement;
  const todoForm = document.getElementById('todo-form') as HTMLFormElement;
  const todoList = document.getElementById('todo-list') as HTMLUListElement;
  const doneList = document.getElementById('done-list') as HTMLUListElement;
  
  // 입력값 가져오기
  const getTodoText = (): string => {
    return todoInput.value.trim();
  };
  
  // 할 일 추가
  const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
  };
  
  // 완료 처리
  const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
  };
  
  // 삭제 처리
  const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
  };
  
  // 아이템 생성 함수
  const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container_item'); // 클래스 이름 수정
  
    const span = document.createElement('span');
    span.classList.add('render-container_item-text');
    span.textContent = todo.text;
  
    const button = document.createElement('button');
    button.classList.add('render-container__item-button');
    button.textContent = isDone ? '삭제' : '완료';
    button.style.backgroundColor = isDone ? '#dc3545' : '#28a745';
  
    button.addEventListener('click', () => {
      isDone ? deleteTodo(todo) : completeTodo(todo);
    });
  
    li.appendChild(span);
    li.appendChild(button);
  
    return li;
  };
  
  // 전체 렌더링 함수
  const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
  
    todos.forEach((todo) => {
      const li = createTodoElement(todo, false);
      todoList.appendChild(li);
    });
  
    doneTasks.forEach((todo) => {
      const li = createTodoElement(todo, true);
      doneList.appendChild(li);
    });
  };
  
  // 제출 이벤트
  todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
      addTodo(text);
    }
  });
  