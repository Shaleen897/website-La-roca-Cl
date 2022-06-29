import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/']);

      }
    })
  }

 

  login(){
    this.loginService.login(this.email, this.password)
    .then(res =>{
      this.router.navigate(['/']);
      this.toastr.success('Block Industrial San Pedro','Bienvenido A:')
    } )
    .catch(error => {
      this.toastr.error(error,'Error')
      /*this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      })*/
    })
  }
}
