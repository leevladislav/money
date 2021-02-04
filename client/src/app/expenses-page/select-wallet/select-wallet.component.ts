import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Wallet} from '../../shared/interfaces/wallets.interfaces';
import {WalletsService} from '../../shared/services/wallets.service';
import {unsubscribe} from '../../utils/unsubscriber';
import {Category} from '../../shared/interfaces/categories.interfaces';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'app-select-wallet',
  templateUrl: './select-wallet.component.html',
  styleUrls: ['./select-wallet.component.scss']
})
export class SelectWalletComponent implements OnInit, OnDestroy {
  category: Category;
  wallets: Wallet[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private walletsService: WalletsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getWallets();

    const routeParamsSub = this.route.params
      .subscribe((params: Params) => this.getCategory(params.categoryId));

    this.subscriptions.push(routeParamsSub);
  }

  getCategory(categoryId: string): void {
    const getCategorySub = this.categoriesService.getById(categoryId)
      .subscribe(
        (category: Category) => this.category = category,
        () => this.router.navigate(['/expenses'])
      );

    this.subscriptions.push(getCategorySub);
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
