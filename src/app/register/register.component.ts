import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private router: Router,
    private userService: UserService,
    private flashService: FlashMessagesService) { }

  ngOnInit() { }

  register(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const formUser = form.value;

    this.userService.signUp(formUser)
      .subscribe(
        _ => {
          this.flashService.show('yep', { cssClass: 'alert-success' });
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log(error);
        }
      );
  }
}
