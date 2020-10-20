import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.users = this.userService.users$;
    this.user = this.userService.getUser(this.id);
  }
  updateForm(id: number): void {
    this.user = this.userService.getUser(id);
  }
}
