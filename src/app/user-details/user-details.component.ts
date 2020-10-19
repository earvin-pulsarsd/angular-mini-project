import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  id = +this.route.snapshot.paramMap.get('id');
  user = this.userService.users$.pipe(map(users => users.find(user => user.id === this.id)));

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    console.log(value)
  }

}
