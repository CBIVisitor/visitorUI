import { Gender } from "../gender/gender";
import { Profile } from "../profile/profile";
import { Event } from "../Event/Event";
import { Door } from "../door/door";
import { Bank } from "../bank/bank";
import { Ministry } from "../ministry/Ministry";
import { Department } from "../department/department";
import { Directorate } from "../directorate/directorate";

export class Visitor {
  public id = 0;
  public fullname = '';
  public fromDate: Date | null = null;
  public toDate: Date | null = null;
  public mobile = 0;
  public email = '';  
  public destination = '';
  public job_description = '';
  public h_Name = '';
  public h_Department = '';
  public h_Directorate = '';
  public note = '';
  public Profile = new Profile;
  public Gender = new Gender;
  public Event = new Event;
  public Door = new Door;
  public Bank = new Bank;
  public Ministry = new Ministry; 
  public Department = new Department;
  public Directorate = new Directorate;
 } 
 
 
export class visible {
  public id = false;
  public fullname = false;
  public fromDate = false;
  public toDate = false;
  public mobile = false;
  public email = false;
  public department = false;
  public directorate = false;
  public destination = false;
  public job_description = false;
  public h_Name = false;
  public h_Department = false;
  public h_Directorate = false;
  public Profile = false;
  public Gender = false;
  public Event = false;
  public Ministry = false;
  public Bank = false;
  public Department = false;
  public Directorate = false;
  
}
