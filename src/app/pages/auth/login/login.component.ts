import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  hide = true;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  async submit() {
    if (this.form.valid) {
        try {
            const { username, password } = this.form.value;
            const response: IUser = await this.authService.login(username, password);
            sessionStorage.setItem('user', JSON.stringify(response));

            this.router.navigate([`/index`]);
        } catch(error) {
            this.error = error.error?.message;
        }
    }
  }
  @Input() error: string | null;
}
