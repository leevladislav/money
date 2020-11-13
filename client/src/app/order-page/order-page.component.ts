import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {OrderService} from './order.service';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../utils/unsubscriber';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy {
  isRoot: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';

    const routerSub = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isRoot = this.router.url === '/order';
        }
      });

    this.subscriptions.push(routerSub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
