import { Itask } from "./tasks";

const taskValidation = (task:Itask) => {
  const {id, title, completed} = task;

  let msgError: string[] = [];

  // id valiodation
  if(id && typeof id != "number"){
    msgError.push("id must be a number")
  }  

  // title valiodation
  if(title && typeof title != "string"){
    msgError.push("title must be a string")
  }

  // completed attribute valiodation
  if(completed && typeof completed != "boolean"){
    msgError.push("completed must be a boolean")
  }

  return {msgError}
}

export default taskValidation;