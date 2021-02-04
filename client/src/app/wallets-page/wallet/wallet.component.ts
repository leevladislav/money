import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {MatDialog} from '@angular/material/dialog';
import {WalletsService} from '../../shared/services/wallets.service';
import {filter, switchMap} from 'rxjs/operators';
import {of, Subscription} from 'rxjs';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {unsubscribe} from '../../utils/unsubscriber';
import {Wallet, WalletCreateParams, WalletUpdateParams} from '../../shared/interfaces/wallets.interfaces';
import {SelectIconComponent} from '../../shared-modules/select-icon/select-icon.component';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isNew = true;
    wallet: Wallet;
    iconName = 'icon-home';

    private subscriptions: Subscription[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private walletsService: WalletsService,
        private router: Router,
        private openModalService: OpenModalInfoService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.getWallet();
    }

    initForm(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            budget: [null, [Validators.required]]
        });

        this.form.disable();
    }

    getWallet(): void {
        const routeSub = this.route.params.pipe(
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
                    this.iconName = wallet.iconName;

                    this.form.patchValue({
                        name: wallet.name,
                        budget: wallet.budget
                    });
                }

                this.form.enable();
            },
            error => this.openModalService.openModal(null, error.error.message)
        );

        this.subscriptions.push(routeSub);
    }

    selectIcon(): void {
        const dialogRef = this.dialog.open(SelectIconComponent, {
            panelClass: ['primary-modal'],
            autoFocus: false
        });

        const dialogRefSub = dialogRef.afterClosed()
            .subscribe((iconName: string) => {
                if (!iconName) {
                    return;
                }

                if (this.wallet && this.wallet.iconName === iconName) {
                    return;
                }

                this.iconName = iconName;

                if (this.isNew) {
                    return;
                }

                this.updateWallet(true);
            });

        this.subscriptions.push(dialogRefSub);
    }

    onDeleteWallet(): void {
        const dialogRef = this.dialog.open(ModalConfirmComponent, {
            data: {
                title: 'Attention!',
                type: `Are you sure you want to delete ${this.wallet.name} wallet?`,
            },
            panelClass: ['primary-modal'],
            autoFocus: false
        });

        const dialogRefSub = dialogRef.afterClosed()
            .pipe(filter((result) => result))
            .subscribe(() => this.deleteWallet());

        this.subscriptions.push(dialogRefSub);
    }

    deleteWallet(): void {
        this.walletsService.delete(this.wallet._id).subscribe(
            response => {
                this.walletsService.walletsUpdated$.next(true);
                this.openModalService.openModal(response, null, response.message, '/wallets');
            },
            error => this.openModalService.openModal(null, error.error.message)
        );
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return this.form.markAllAsTouched();
        }

        this.form.disable();

        this.isNew ? this.createWallet() : this.updateWallet();
    }

    createWallet(): void {
        const data: WalletCreateParams = {
            name: this.form.value.name,
            budget: this.form.value.budget,
            iconName: this.iconName
        };

        const createWalletSub = this.walletsService.create(data)
            .subscribe(
                wallet => {
                    this.wallet = wallet;
                    this.form.enable();
                    this.walletsService.walletsUpdated$.next(true);
                    this.openModalService.openModal(wallet, null, 'Wallet successfully added', '/wallets');
                },
                error => {
                    this.form.enable();
                    this.openModalService.openModal(null, error.error.message);
                });

        this.subscriptions.push(createWalletSub);
    }

    updateWallet(isIconUpdate = false): void {
        const data: WalletUpdateParams = {
            id: this.wallet._id || null,
            name: this.form.value.name,
            budget: this.form.value.budget,
            iconName: this.iconName
        };

        const updateWalletSub = this.walletsService.update(data)
            .subscribe(
                (wallet: Wallet) => {
                    this.wallet = wallet;
                    this.form.enable();
                    this.walletsService.walletsUpdated$.next(true);

                    if (!isIconUpdate) {
                        this.openModalService.openModal(
                            wallet,
                            null,
                            'Wallet successfully edited',
                            '/wallets'
                        );
                    }
                },
                (error) => {
                    this.form.enable();
                    this.openModalService.openModal(null, error.error.message);
                });

        this.subscriptions.push(updateWalletSub);
    }

    ngOnDestroy(): void {
        unsubscribe(this.subscriptions);
    }
}
