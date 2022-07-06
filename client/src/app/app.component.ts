import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_modals/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dating App';

  constructor(private http: HttpClient, private accountService: AccountService){

  }

  ngOnInit(){
    this.setCurrentUser();
  }
    
  setCurrentUser(){
    const user : User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}

