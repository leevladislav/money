import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../utils/unsubscriber';
import {OpenModalInfoService} from '../shared/services/open-modal-info.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hide = true;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.form.disable();

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const data = this.form.value;

    const registerSub = this.auth.register(data)
      .subscribe(
        () => this.router.navigate(['/login'], {queryParams: {registered: true}}),
        (error) => {
          this.openModalService.openModal(null, error.error.message);
          this.form.enable();
        });

    this.subscriptions.push(registerSub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
