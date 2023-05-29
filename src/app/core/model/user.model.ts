import { Societe } from './Societe.model';
import { BaseModel } from './base.model';

export class User extends BaseModel {

    userId!: number;
    firstName!: string;
    lastName!: string;
    socID!: Societe;

    fullName!: string;

    username!: string;
    useremail!: string;
    userdisplayname!: string;
    email!: string;

    type!: string;


    password: any;
    confirmPassword: any;

    joiningDate!: string;

    loginType!: string;
    userType!: string;

}
