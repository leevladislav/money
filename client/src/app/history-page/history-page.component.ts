import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '../shared/services/orders.service';
import {Filter, Order} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../utils/unsubscriber';

const STEP = 4;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  offset = 0;
  limit = STEP;
  filter: Filter = {};
  loading = false;
  reloading = false;
  noMoreOrders = false;

  private subscriptions: Subscription[] = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    // this.reloading = true;
    // this.fetch();
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });

    const getOrdersSub = this.ordersService.fetch(params)
      .subscribe(orders => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = orders.length < STEP;
        this.loading = false;
        this.reloading = false;
      });

    this.subscriptions.push(getOrdersSub);
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
