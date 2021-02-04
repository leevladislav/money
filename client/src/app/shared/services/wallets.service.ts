import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {Wallet, WalletCreateParams, WalletUpdateParams} from '../interfaces/wallets.interfaces';
import {Message} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {
  walletsUpdated$ = new Subject<boolean>();
  wallets$ = new BehaviorSubject<Wallet[]>([]);

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('/api/wallets');
  }

  getById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`/api/wallets/${id}`);
  }

  create(data: WalletCreateParams): Observable<Wallet> {
    return this.http.post<Wallet>('/api/wallets', data);
  }

  update(data: WalletUpdateParams): Observable<Wallet> {
    return this.http.patch<Wallet>(`/api/wallets/${data.id}`, data);
  }

  addIncome(wallet: Wallet): Observable<Wallet> {
    return this.http.patch<Wallet>(`/api/wallets/add-income/${wallet._id}`, wallet);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/wallets/${id}`);
  }

  throwWallets(wallets: Wallet[]) {
    this.wallets$.next(wallets);
  }
}
