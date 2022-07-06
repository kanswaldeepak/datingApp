import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Register } from '../_modals/register';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: Register = {
    username: '',
    password: ''
  };

  @Output() cancelClick = new EventEmitter<boolean>();
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(
      response => {
        console.log(response);
      });
  }

  cancel(){
    this.cancelClick.emit(false);
  }

}
