import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {WalletsService} from '../../shared/services/wallets.service';
import {Wallet} from '../../shared/interfaces';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss']
})
export class WalletsListComponent implements OnInit {
  wallets$: Observable<Wallet[]>;

  constructor(private walletsService: WalletsService) { }

  ngOnInit() {
    this.wallets$ = this.walletsService.fetch();
  }
}
