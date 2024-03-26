import { TASK } from '../../constant'

export type StatusType = typeof TASK.Status[keyof typeof TASK.Status]
