import { Task } from '../../domain'

export class CreateTask {
  execute(title: string, content: string, expire: number) {
    const task = new Task(title, 0, content, expire)
    console.log(task)
    // const taskRepository = new TaskRepository(pool)
    // return taskRepository.persist(task) //永続化
  }
}
