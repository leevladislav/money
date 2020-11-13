import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces';
import {ProfileService} from '../../services/profile.service';
import {Observable, Subscription} from 'rxjs';
import {WalletsService} from '../../services/wallets.service';
import {unsubscribe} from '../../../utils/unsubscriber';
import {Wallet} from '../../interfaces/wallets.interfaces';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, OnDestroy {
  links = [
    {url: '/expenses', name: 'Expenses'},
    {url: '/wallets', name: 'Wallets'},
    {url: '/categories', name: 'Categories'},
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'}
  ];
  profile$: Observable<User>;
  isOpenedSidebar = true;
  innerWidth;

  private subscriptions: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService,
    private walletsService: WalletsService
  ) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 1024) {
      this.isOpenedSidebar = false;
    }

    this.getProfile();
    this.getWallets();
  }

  getProfile(): void {
    this.profile$ = this.profileService.getProfile();
  }

  getWallets(): void {
    const fetchWalletsSub = this.walletsService.fetch()
      .subscribe((wallets: Wallet[]) => this.walletsService.throwWallets(wallets));

    this.subscriptions.push(fetchWalletsSub);
  }

  onToggleSidebar(event: boolean): void {
    this.isOpenedSidebar = event;
  }

  logout(event: Event): void {
    event.preventDefault();

    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
