import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message, Wallet} from '../interfaces';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {WalletCreateParams, WalletUpdateParams} from '../interfaces/wallets.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {
  wallets$ = new BehaviorSubject<Wallet[]>([]);
  onUpdateWallets$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('/api/wallets');
  }

  getById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`/api/wallets/${id}`);
  }

  create(data: WalletCreateParams): Observable<Wallet> {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image, data.image.name);
    }

    formData.append('name', data.name);
    formData.append('budget', data.budget.toString());

    return this.http.post<Wallet>('/api/wallets', formData);
  }

  update(data: WalletUpdateParams): Observable<Wallet> {
    const formData = new FormData();

    if (data.image) {
      formData.append('image', data.image, data.image.name);
    }

    formData.append('name', data.name);
    formData.append('budget', data.budget.toString());

    return this.http.patch<Wallet>(`/api/wallets/${data.id}`, formData);
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
