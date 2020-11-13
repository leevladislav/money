import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../shared/services/positions.service';
import {Position} from '../../shared/interfaces';
import {ModalConfirmComponent} from '../../entry-components/modal-confirm/modal-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {OpenModalInfoService} from '../../shared/services/open-modal-info.service';
import {Subscription} from 'rxjs';
import {unsubscribe} from '../../utils/unsubscriber';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.scss']
})
export class PositionsListComponent implements OnInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;

  positions: Position[] = [];
  loading = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private positionsService: PositionsService,
    private openModalService: OpenModalInfoService
  ) {
  }

  ngOnInit() {
    this.loading = true;

    const positionsSub = this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });

    this.subscriptions.push(positionsSub);
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation();
    event.preventDefault();

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Attention!',
        type: `Are you sure you want to delete position ${position.name} ?`,
      },
      panelClass: ['primary-modal'],
      autoFocus: false
    });

    const dialogSub = dialogRef.afterClosed()
      .pipe(filter((result) => result))
      .subscribe(() => this.deletePosition(position));

    this.subscriptions.push(dialogSub);
  }

  deletePosition(position) {
    const deletePositionSub = this.positionsService.delete(position)
      .subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);

          this.openModalService.openModal(response, null, response.message)
        },
        error => this.openModalService.openModal(null, error.error.message),
      );

    this.subscriptions.push(deletePositionSub);
  }

  ngOnDestroy() {
    unsubscribe(this.subscriptions);
  }
}
