import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message, Wallet} from '../interfaces';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {
  onUpdateWallets$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Wallet[]> {
    return this.http.get<Wallet[]>('/api/wallets');
  }

  getById(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(`/api/wallets/${id}`);
  }

  create(name: string, budget: number, image?: File): Observable<Wallet> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('name', name);
    formData.append('budget', budget.toString());

    return this.http.post<Wallet>('/api/wallets', formData);
  }

  update(id: string, name: string, budget: number, image?: File): Observable<Wallet> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }

    formData.append('name', name);
    formData.append('budget', budget.toString());

    return this.http.patch<Wallet>(`/api/wallets/${id}`, formData);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/wallets/${id}`);
  }
}
