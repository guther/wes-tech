export interface Itask {
    id: number          //  Unique identifier for the task
    title:string        // Title of the task
    completed: boolean  // Indicates whether the task is completed
}

const tasks = () => {
    const taskList: Itask[] = [];
}

export default tasks;