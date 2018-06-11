//假装是数据库
const db = {
  getUid(){
    let todoNextId = localStorage.getItem('todoNextId') || 1;
    localStorage.setItem('todoNextId', todoNextId - (-1))
    return todoNextId;
  },
  search(list,id){
    let left = 0;
    let right = list.length-1;
    while(left <= right){
      let mid = Math.floor((left - (-right))/2)
        ,midId = list[mid].id;
      if(midId == id) return mid;
      id > midId && (left = mid + 1) || (right = mid - 1)
    }
    return -1;
  },
  save(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
  },
  getStore(){
    let store = localStorage.getItem('todos');
    return store && JSON.parse(store) || []
  },
  getTodo(){
    let store = this.getStore();
    let res = {
      list: store,
      unfinish: 0
    };
    for(let todo of store){
      if(!todo.finished) res.unfinish++;
    }
    return res;
  },
  addTodo(todo){
    todo.id = this.getUid();
    let store = this.getStore();
    store.push(todo);

    this.save(store);
    return todo;
  },
  updateTodo(todo){
    let store = this.getStore();
      let index = this.search(store, todo.id);
      if(index == -1){
        throw new Error('所选代办事项不存在')
      }
      store[index] = todo;
      this.save(store);
  },
  finishAll(finished){
    let store = this.getStore();
    store.forEach(todo => {
      todo.finished = finished;
    })
    this.save(store);
  },
  deleteTodo(todos){
    let store = this.getStore();
    todos.forEach(todo => {
      let index = this.search(store, todo.id);
      if(index ==-1){
        throw new Error('所选待办事项不存在')
      }
      store.splice(index,1);
    })
    this.save(store);
  }
}


export default function(url,data){
  return new Promise((resolve, reject) => {
    try{
      if(!db[url]) throw new Error('404');
      data = data && JSON.parse(JSON.stringify(data));
      let res = db[url](data);
      resolve({
        data: res,
        message: '成功'
      }) 
    }
    catch(e){
      reject({
        message: e.message
      })
    }
  })
  
}