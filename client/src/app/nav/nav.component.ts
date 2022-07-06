import { Component, OnInit } from '@angular/core';
import { User } from '../_modals/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean;
  constructor(public accountService: AccountService) { }

  ngOnInit() {
    
  }

  login(){
    
    this.accountService.login(this.model).subscribe(
      response => {
        const user: User = JSON.parse(localStorage.getItem('user'));
        this.accountService.setCurrentUser(user);
        this.loggedIn = true;
      }, error => {
        console.log(error);
      }
    );
  }

  logout(){
    this.loggedIn = false;
    this.accountService.logOut();
  }

}
