import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {WalletsService} from '../../shared/services/wallets.service';
import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {unsubscribe} from '../../utils/unsubscriber';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss']
})
export class WalletsListComponent implements OnInit, OnDestroy {
  wallets: Wallet[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private walletsService: WalletsService) {
  }

  ngOnInit(): void {
    this.getWallets();
  }

  getWallets(): void {
    const walletsSub = this.walletsService.wallets$
      .subscribe((wallets: Wallet[]) => this.wallets = [...wallets || []]);

    this.subscriptions.push(walletsSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
