import express, { Request, Response } from 'express';
import { Itask } from './tasks';
import taskValidation from './validation';
const app = express();

app.use(express.json())
const taskList: Itask[] = [];

app.get('/', (req: Request, res: Response) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.get('/tasks', (req: Request, res: Response) => {
  res.send(taskList);
});

app.post('/tasks', (req: Request, res: Response) => {
  const task: Itask = req.body;

  const validation = taskValidation(task)

  if (validation.msgError.length > 0) {
    res.status(400);
    const errors = validation.msgError.join(", ");
    res.send(errors);
    return;
  }

  const index: number = taskList.findIndex((taskStored: Itask) => taskStored.id == task.id);
  if (index >= 0) {
    res.status(400);
    res.send(`Already exists a task with id ${task.id}`);
    return;
  }

  taskList.push(task)
  res.send(task)
});

app.put('/tasks/:id', (req: Request, res: Response) => {
  const task: Itask = req.body;
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400);
    res.send("id must be a number");
    return;
  }

  delete task.id;

  const validation = taskValidation(task)

  if (validation.msgError.length > 0) {
    res.status(400);
    const errors = validation.msgError.join(", ");
    res.send(errors);
    return;
  }

  const index: number = taskList.findIndex((task: Itask) => task.id == id);
  if (index == -1) {
    res.status(404);
    res.send(`No task found with id ${id}`);
    return;
  }

  taskList[index] = {
    ...taskList[index],
    ...task
  }

  res.send(taskList[index]);

});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    res.status(400);
    res.send("id must be a number");
    return;
  }

  const index: number = taskList.findIndex((task: Itask) => task.id == id);
  if (index == -1) {
    res.status(404);
    res.send(`No task found with id ${id}`);
    return;
  }

  taskList.splice(index, 1);

  res.send("");

});


const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// curl -X --data {teste: 1234} http://localhost:3000/tasks


// curl -H 'Content-Type: application/json' -d '{ "title":"foo","body":"bar", "id": 1}' -X POST http://localhost:3000/tasks