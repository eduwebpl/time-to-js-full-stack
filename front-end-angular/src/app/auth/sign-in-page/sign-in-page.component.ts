import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { Credentials } from '../credentials'

@Component({
  template: `
    <section>
      <h3 class="is-size-3 my-3">Sign to place the Order</h3>
      <form #signInForm="ngForm" (ngSubmit)="handleSubmitForm(signInForm)">
        <div class="field"><label class="label">E-mail *</label>
          <div class="control">
            <input name="email" class="input" type="email"
                   [(ngModel)]="credentials.email"
                   required placeholder="Your e-mail"></div>
        </div>
        <div class="field"><label class="label">Password *</label>
          <div class="control"><input name="password" required class="input" type="password"
                                      [(ngModel)]="credentials.password"
                                      placeholder="Your password"></div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-link"
                    type="submit"
                    [ngStyle]="{ opacity: signInForm.valid ? 1 : 0.5}">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </section>
  `,
  styles: [
    `.ng-invalid.ng-touched {
      border-color: crimson
    }`
  ]
})
export class SignInPageComponent implements OnInit {

  credentials: Credentials = {
    email: '',
    password: ''
  }
  signInError = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmitForm(form: NgForm) {
    if(form.invalid) {
      return
    }
    this.authService.signIn(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err: HttpErrorResponse) => {
        this.signInError = err.error?.message || err.message
      }
    })
  }
}
