import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { IonicModule } from '@ionic/angular';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule,  FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, IonicModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('cardHover', [
      state('noHover', style({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      })),
      state('hover', style({
        transform: 'perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05)'
      })),
      transition('noHover => hover', animate('300ms ease-in-out')),
      transition('hover => noHover', animate('300ms ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  isHovered: boolean = false;
  loginForm! :  FormGroup;

  constructor(private router:Router) {
    this.loginForm =  new FormGroup({
      email : new FormControl('',  Validators.required),
      password:new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }


  submit(){
   console.log(this.loginForm.value)

   if(this.loginForm.value.email == 'root@mail.com' || this.loginForm.value.password == 'root'){
    localStorage.setItem("user", JSON.stringify(this.loginForm.value) )
    this.router.navigate(['/animations'])
   }

  }


}
