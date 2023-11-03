import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  generateReport(data: any) {
    return this.httpClient.post(this.url + '/bill/generateReport/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getPdf(data: any): Observable<Blob> {
    return this.httpClient.post(this.url + '/bill/getPdf', data, {
      responseType: 'blob',
    });
  }

  getBills() {
    return this.httpClient.get(this.url + '/bill/getBills');
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + '/bill/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  dateFilter(data:any){
    return this.httpClient.post(this.url + '/bill/dateFilter/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
