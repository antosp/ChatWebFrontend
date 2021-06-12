import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) { }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  async submit() {
    if (this.form.valid) {
        try {
          const { username, password, firstName, lastName } = this.form.value;
          const response: IUser = await this.authService.register(username, firstName, lastName, password);
          sessionStorage.setItem('token', response.token);

          this.snackBar.open("Registration is successfully", 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000
          });

          this.router.navigate([`/auth/login`]);
        } catch(error) {
            this.error = error.error?.message;
        }
    }
  }
  @Input() error: string | null;
}
