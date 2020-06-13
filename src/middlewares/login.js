const login = store => next => action => {
  const { type, payload } = action;
  const result =  next(action);
  switch(type) {
    case 'LOGIN':
      console.log('payload: ', payload);
      break;
  }
  return result;
}

export default login;
