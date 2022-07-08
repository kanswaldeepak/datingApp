import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
  constructor(public accountService: AccountService, private route: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  login(){
    
    this.accountService.login(this.model).subscribe(
      response => {
        const user: User = JSON.parse(localStorage.getItem('user'));
        if(user)
        {
          this.accountService.setCurrentUser(user);
          this.loggedIn = true;
          this.route.navigateByUrl('members');
        }
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  logout(){
    this.loggedIn = false;
    this.accountService.logOut();
    this.route.navigateByUrl('');
  }

}
