import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() { }

  login(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const formUser = form.value;

    this.userService.signIn(formUser)
      .subscribe(
        _ => {
          this.router.navigateByUrl('/');
        },
        error => {
          console.log(error.message);
        }
      );
  }

  checkRegister() {
    this.router.navigateByUrl('/register');
  }
}
