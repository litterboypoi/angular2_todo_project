/**
 * Created by shigure on 2017/5/17.
 */
import { Project } from './project'
import { Invitation } from './invitation'

export class User{
    id: number;
    name: string;
    faceUrl: string;
    projectList: any[];
    invitationList:Invitation[];

}

