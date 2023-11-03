import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    return this.httpClient.post(this.url + '/course/add/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  update(data: any) {
    return this.httpClient.patch(this.url + '/course/update/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getProducts() {
    return this.httpClient.get(this.url + '/course/get/');
  }

  updateStatus(data: any) {
    return this.httpClient.patch(this.url + '/course/updateStatus/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  delete(id: any) {
    return this.httpClient.delete(this.url + '/course/delete/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getById(id: any) {
    return this.httpClient.get(this.url + '/course/getById/' + id);
  }
}
