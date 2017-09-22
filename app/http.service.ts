import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import  { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Project } from './project';
import { Task } from './task';
import { User } from './user';
import { UserShortCut } from './usershortcut';
import { Invitation } from './invitation';

@Injectable()
export class HttpService{

  private headers = new Headers({'Content-Type':'application/json'});
  private projectsUrl = '/api/projects';
    private tasksUrl = '/api/tasks';

  /*
  * 通过Rxjs让订阅Observable的组件能知道projects变化了，
  * 实现当一个组件改变了projects的值时别的组件也能跟着改变。
  *参考于： http://mean.expert/2016/05/21/angular-2-component-communication/
  * */
  private projects:Project[];

  private subject: Subject<Project[]> = new Subject<Project[]>();

	constructor(private http: Http){}

	getProjects(): void {
       this.http.get(this.projectsUrl)
    			.toPromise()
    			.then(response=>{
                    this.projects = response.json().data as Project[];
    			    this.subject.next(response.json().data);

    			})
    			.catch(this.handleError);
  	}

  	getProject(id: number): Promise<Project>{
  		return this.http.get(`${this.projectsUrl}/${id}`)
            .toPromise()
            .then(response=>response.json().data as Project)
            .catch(this.handleError);
  	}

    createProject(project: Project): void{
       this.http.post(this.projectsUrl,JSON.stringify(project),{headers: this.headers})
                  .toPromise()
                  .then(res=>{
                      this.projects[this.projects.length] = res.json().data as Project;
                      this.subject.next(this.projects);
                  })
                  .catch(this.handleError);
    }

    updateProject(project: Project):void{
	    let url = `${this.projectsUrl}/${project.id}`;
        this.http.put(url,JSON.stringify(project),{headers: this.headers})
            .toPromise()
            .then(res=>{
                this.projects[this.findprojectindex(project.id)] = res.json().data as Project;
                this.subject.next(this.projects);
            })
            .catch(this.handleError);
    }

    deleteProjcet(id: number): Promise<void>{
      const url = `${this.projectsUrl}/${id}`;
      return this.http.delete(url)
          .toPromise()
          .then(()=>null)
          .catch(this.handleError);
    }

    getRxjsProjects(): Observable<Project[]>{
	    return this.subject.asObservable();
    }


    getTask(id: number): Promise<Task>{
        return this.http
            .get(`${this.tasksUrl}/${id}`)
            .toPromise()
            .then(res=> res.json().data as Task)
            .catch(this.handleError);
    }

    createTask(task: Task): void{
         this.http
            .post(this.tasksUrl,JSON.stringify(task),{headers: this.headers})
            .toPromise()
            .then(res=>{
                let newTask = res.json().data as Task;
                let pId = this.findprojectindex(task.projectid);
                if(pId===-1){
                    return;
                }else{
                    this.projects[pId].taskList.push(newTask);
                    this.subject.next(this.projects);

                }
            })
            .catch(this.handleError);
    }

    updateTask(id:number, task: Task): void{
        const url = `${this.tasksUrl}/${id}`;
        this.http
            .put(url, JSON.stringify(task), {headers: this.headers})
            .toPromise()
            .then(res=>{
             let task = res.json().data as Task;
             let pId = this.findprojectindex(task.projectid);
             if(pId===-1){
                 return ;
             }else{
                 let taskList = this.projects[pId].taskList;
                 for(let i=0;i<taskList.length;i++){
                     if(task.id===taskList[i].id){
                         taskList[i] = task;
                     }
                 }
                 this.projects[this.findprojectindex(task.projectid)].taskList=taskList;
                 this.subject.next(this.projects);
             }
            })
            .catch(this.handleError);
    }

    deleteTask(task: Task): Promise<void>{
        const url = `${this.tasksUrl}/${task.id}`;
        return this.http.delete(url)
            .toPromise()
            .then(()=>{
                let taskList = this.projects[this.findprojectindex(task.projectid)].taskList;
                for(let i=0;i<taskList.length;i++){
                    if(task.id===taskList[i].id){
                        this.projects[this.findprojectindex(task.projectid)].taskList.splice(i,1);
                    }
                }
                this.projects[this.findprojectindex(task.projectid)].taskList=taskList;
                this.subject.next(this.projects);
                //return 'success'
            })
            .catch(this.handleError);
    }

    inviteUser(invitation:Invitation){
	    return this.http.post('/api/invitation',JSON.stringify(invitation),{headers:this.headers})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
    }

    changeInvitation(invitation:Invitation):Promise<Invitation>{
        return this.http.put('/api/invitation/'+invitation.invitationId,JSON.stringify(invitation),{headers:this.headers})
            .toPromise()
            .then(res=>res.json().data as Invitation)
            .catch(this.handleError);
    }

    getMyInfo(){
	    return this.http.get('/api/myinfo')
            .toPromise()
            .then((res)=>{
	        return res.json().data as User;
            })
    }

    getUserInfo(id:number){
        return this.http.get('/api/user/'+id)
            .toPromise()
            .then((res)=>{
                return res.json().data as UserShortCut;
            })
    }

    register(userinfo:any){
        return this.http.post('/api/user',JSON.stringify(userinfo),{headers:this.headers})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
    }

    login(userNmae:string,pwd:string):Promise<string>{
        let logininfo={name:userNmae,pwd:pwd}
	    return this.http.post(`/api/login`,JSON.stringify(logininfo),{headers:this.headers})
            .toPromise()
            .then((res)=>{
	            return res.json().data as string;
            })
            .catch(this.handleError);
    }

    private findprojectindex(projectid:number):number{
	    for(let i=0;i<this.projects.length;i++){
	        if(projectid===this.projects[i].id){
                return i;
            }
        }
        return -1;
    }
    /*private findtaskindex(taskList:Task[],taskid:number):number{
        for(let i=0;i<taskList.length;i++){
            if(taskid===taskList[i].id){
                return i;
            }
        }
        return taskList.length;
    }*/
    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}