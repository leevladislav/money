import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {OrdersService} from '../../shared/services/orders.service';
import {Order, OrderPosition} from '../../shared/interfaces';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {unsubscribe} from '../../utils/unsubscriber';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class OrderCartComponent implements OnInit, OnDestroy {
  pending = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private ordersService: OrdersService,
    private openModalService: OpenModalInfoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  removePosition(orderPosition: OrderPosition): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete position?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    const dialogRefSub = dialogRef.afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => this.orderService.remove(orderPosition));

    this.subscriptions.push(dialogRefSub);
  }

  submit(): void {
    this.pending = true;

    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id;
        return item;
      })
    };

    const createSub = this.ordersService.create(order)
      .subscribe(
        newOrder => {
          this.openModalService.openModal(newOrder, null, `Order #${newOrder.order} successfully added!`);
          this.orderService.clear();
        },
        error => this.openModalService.openModal(null, error.error.message),
        () => {
          this.pending = false;
          this.router.navigate(['/order']);
        }
      );

    this.subscriptions.push(createSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}
