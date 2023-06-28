import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';

imports:[
  HttpClientModule
]



@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private url="https://formspree.io/f/xgebbvye"
  //https://formspree.io/f/xgebbvye

  constructor(private http:HttpClient) { }
  SendEmail(input:any){
    return this.http.post(this.url, input, {responseType:'text'}).pipe(
      map((response:any)=>{
          if(response){
            return response
          }
          (error:any)=>{
            if(error){
              return error
            }
          }
        }
      )
    )
  }
}

providers:[
  EmailService
]
