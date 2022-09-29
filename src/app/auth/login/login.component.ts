import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Person } from '../../sys/person/Person'; 
import { FormBuilder } from '@angular/forms'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string= ""
  password:string= "" 
  LogForm = this.formBuilder.group({
    username: '',
    password: ''
  });


  constructor(public authservices: AuthService, private formBuilder: FormBuilder) { }
  person: Person = {
    id: 0,
    username: "",
    password: ""
  }
  ngOnInit(): void { 

    console.log(this.authservices.Islogin())
   
 
  }
  signin(){

    console.log(this.loginform )

   // this.authservices.signIn(this.person)
  }
  onSubmit(){
    let username = this.LogForm.get('username')?.value
    let password = this.LogForm.get('password')?.value

    console.log(username);  

    console.log(password);  

    this.person.username = username
    this.person.password = password

    this.authservices.signIn(this.person)


  }
  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
