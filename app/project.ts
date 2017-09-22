import { Task } from './task';
import { UserShortCut } from './usershortcut';

export class Project{
	id: number;
  	name: string;
  	detail:string;
  	taskList: Task[];
  	userList: UserShortCut[];
}