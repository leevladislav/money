import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WalletsService} from '../../shared/services/wallets.service';
import {Wallet} from '../../shared/interfaces';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss']
})
export class WalletsListComponent implements OnInit, OnDestroy {
  wallets$: Observable<Wallet[]>;

  constructor(private walletsService: WalletsService) {
  }

  ngOnInit() {
    this.walletsService.onUpdateWallets$
      .pipe(untilDestroyed(this))
      .subscribe(trigger => {
        if (trigger) {
          this.getWallets();
        }
      });

    this.getWallets();
  }

  getWallets() {
    this.wallets$ = this.walletsService.fetch();
  }

  ngOnDestroy() {
  }
}
