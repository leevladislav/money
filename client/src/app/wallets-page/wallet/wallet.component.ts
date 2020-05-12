import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Wallet} from '../../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {MatDialog} from '@angular/material/dialog';
import {WalletsService} from '../../shared/services/wallets.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
  @ViewChild('input', {static: false}) inputRef: ElementRef;
  form: FormGroup;
  image: File;
  imagePreview: any = '';
  isNew = true;
  wallet: Wallet;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private walletsService: WalletsService,
    private router: Router,
    private openModalService: OpenModalInfoService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getWallet();
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      budget: [null, [Validators.required]]
    });

    this.form.disable();
  }

  getWallet() {
    this.route.params.pipe(
      untilDestroyed(this),
      switchMap(
        (params: Params) => {
          if (params.id) {
            this.isNew = false;
            return this.walletsService.getById(params.id);
          }

          return of(null);
        }
      )
    ).subscribe(
      (wallet: Wallet) => {
        if (wallet) {
          this.wallet = wallet;

          this.form.patchValue({
            name: wallet.name,
            budget: wallet.budget
          });

          this.imagePreview = wallet.imageSrc;
        }

        this.form.enable();
      },
      error => this.openModalService.openModal(null, error.error.message)
    );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  deleteWallet() {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete ${this.wallet.name} wallet?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.walletsService.delete(this.wallet._id)
            .pipe(untilDestroyed(this))
            .subscribe(
              response => {
                this.openModalService.openModal(response, null, response.message, '/wallets');
                this.walletsService.onUpdateWallets$.next(true);
              },
              error => this.openModalService.openModal(null, error.error.message)
            );
        }
      });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    let messageSuccess = 'Wallet successfully edited';

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.form.disable();

    if (this.isNew) {
      messageSuccess = 'Wallet successfully added';
      obs$ = this.walletsService.create(this.form.value.name, this.form.value.budget, this.image);
    } else {
      obs$ = this.walletsService.update(this.wallet._id, this.form.value.name, this.form.value.budget, this.image);
    }

    obs$.pipe(untilDestroyed(this))
      .subscribe(
        wallet => {
          this.wallet = wallet;
          this.openModalService.openModal(wallet, null, messageSuccess, '/wallets');
          this.form.enable();
          this.walletsService.onUpdateWallets$.next(true);
        },
        error => {
          this.openModalService.openModal(null, error.error.message);
          this.form.enable();
        });
  }

  ngOnDestroy() {
  }
}
