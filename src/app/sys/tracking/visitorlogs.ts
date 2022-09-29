 
import { Visitor } from "../Visitor/visitor";
import { Door } from "../door/door"; 

export class Visitor_Logs {
  public id = 0; 
  public day: Date | null = null;
  public mainDoorIn: Date | null = null;
  public mainDoorOut: Date | null = null;
  public subDoorIn: Date | null = null;
  public subDoorOut: Date | null = null;    
  public door = new Door;
  public Visitor = new Visitor; 
 }  
 

 