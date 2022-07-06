import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_modals/user';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(private http: HttpClient) { }

  BaseUrl = "https://localhost:5001/api";
  private userLoginSubject = new ReplaySubject<User>(1);
  currentUser$ = this.userLoginSubject.asObservable();

  login(model: any){
    return this.http.post(this.BaseUrl + "/account/login", model).pipe(
      map((res: User) =>{
        const user = res;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.userLoginSubject.next(user);
        }
      })
    );    
  }

  register(model: any){
    return this.http.post(this.BaseUrl + '/account/register', model).pipe(
      map((response : User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.userLoginSubject.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User){
    //if(this.userLoginSubject.next == null)
    this.userLoginSubject.next(user);
  }

  logOut(){
    localStorage.removeItem('user');
    this.userLoginSubject.next(null);
  }

}
