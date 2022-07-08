import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error(error.error)
      });
  }

  cancel(){
    this.cancelClick.emit(false);
  }

}
