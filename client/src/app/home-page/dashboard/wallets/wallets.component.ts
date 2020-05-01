import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Wallet} from '../../../shared/interfaces';
import {WalletsService} from '../../../shared/services/wallets.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {
  wallets$: Observable<Wallet[]>;

  constructor(private walletsService: WalletsService) { }

  ngOnInit() {
    this.wallets$ = this.walletsService.fetch();
  }
}
