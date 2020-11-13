import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {unsubscribe} from '../utils/unsubscriber';
import {Subscription} from 'rxjs';
import {OpenModalInfoService} from '../shared/services/open-modal-info.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hide = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    const routeSub = this.route.queryParams
      .subscribe((params: Params) => {
        // TODO: remove check
        if (params.registered) {
          console.log('Registration success');
        } else if (params.accessDenied) {
          console.log('At first you have to registration');
        } else if (params.sessionFailed) {
          console.log('Please, login system back');
        }
      });

    this.subscriptions.push(routeSub);
  }

  initForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.form.disable();

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const data = this.form.value;

    const loginSub = this.auth.login(data)
      .subscribe(
        () => this.router.navigate(['/expenses']),
        (error) => {
          this.openModalService.openModal(null, error.error.message);
          this.form.enable();
        });

    this.subscriptions.push(loginSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
