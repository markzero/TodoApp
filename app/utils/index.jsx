export var todoExistsInState = (state, todo) => {
  return state.todos.some((element, index, array) => {
    return element.createdAt === todo.createdAt;
  });
};
