import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$ = this.userService.users$;
  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource = this.users$;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
