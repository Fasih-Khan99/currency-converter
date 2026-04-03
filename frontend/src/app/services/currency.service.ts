import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ENDPOINTS } from '../shared/endpoints';

@Injectable({ providedIn: 'root' })
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(ENDPOINTS.CURRENCY.LIST);
  }

  getRates(base: string, date?: string): Observable<any> {
    let params = new HttpParams().set('base', base);

    if (date) {
      params = params.set('date', date);
    }

    return this.http.get(ENDPOINTS.CURRENCY.CONVERT, { params });
  }

  saveTransaction(record: any) {
    const history = JSON.parse(localStorage.getItem('conv_history') || '[]');
    history.unshift({ ...record, timestamp: new Date() });
    localStorage.setItem('conv_history', JSON.stringify(history));
  }

  getHistory() {
    return JSON.parse(localStorage.getItem('conv_history') || '[]');
  }
}