import {Injectable, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalInfoComponent} from '../../entry-components/modal-info/modal-info.component';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../../utils/unsubscriber';

@Injectable({
  providedIn: 'root'
})
export class OpenModalInfoService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  openModal(result, error, messageSuccess?, router?) {
    if (result && router) {
      const dialogRef = this.dialog.open(ModalInfoComponent, {
        data: {
          title: 'Thank You!',
          message: messageSuccess,
        },
        panelClass: ['primary-modal'],
        autoFocus: false
      });

      const dialogRefSub = dialogRef.afterClosed()
        .subscribe(() => this.router.navigate([router]));

      this.subscriptions.push(dialogRefSub);
    }

    if (result && !router) {
      this.dialog.open(ModalInfoComponent, {
        data: {
          title: 'Thank You!',
          message: messageSuccess,
        },
        panelClass: ['primary-modal'],
        autoFocus: false
      });
    }

    if (error) {
      this.dialog.open(ModalInfoComponent, {
        data: {
          title: 'Error',
          message: error,
        },
        panelClass: ['primary-modal'],
        autoFocus: false
      });
    }
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
