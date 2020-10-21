import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import * as L from 'leaflet';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  isEditable: boolean = true;
  id: number;
  users: Observable<User[]>;
  user: Observable<User>;
  private map;

  constructor(private userService: UserService, private route: ActivatedRoute) { }
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.users = this.userService.users$;
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.updateForm(this.id);
  }
  ngOnDestroy(): void {
  }
  updateForm(id: number): void {
    this.user = this.userService.getUser(id);
    this.user.subscribe(user => {this.map.setView([user.address.geo.lat, user.address.geo.lng], 3), L.marker([user.address.geo.lat, user.address.geo.lng]).addTo(this.map)});
  }
  toggleEdit(): void {
    this.isEditable = false;
  }
}
