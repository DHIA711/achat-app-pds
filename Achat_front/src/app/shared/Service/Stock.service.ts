import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
//import { API_URL } from '../../../../config'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  //readonly API_URL = `${API_URL}/SpringMVC/stock`;
    readonly API_URL = `${environment.apiUrl}/SpringMVC/stock`;

  constructor(private httpClient: HttpClient) { }

  getAllStocks() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-stocks`)
  }
  addStock(stock : any) {
    return this.httpClient.post(`${this.API_URL}/add-stock`, stock)
  }
  editStock(stock : any){
    return this.httpClient.put(`${this.API_URL}/modify-stock`, stock)
  }
  deleteStock(idStock : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-stock/${idStock}`)
  }
}
