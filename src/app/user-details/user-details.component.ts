import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';
import * as L from 'leaflet';
import { Post } from '../post';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['title', 'body'];
  dataSource: MatTableDataSource<Post>;

  isNotEditable: boolean;
  id: number;
  users: Observable<User[]>;
  user: Observable<User>;
  posts: Observable<Post[]>;
  // private map;

  constructor(private userService: UserService, 
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.isNotEditable = true;
    this.id = +this.route.snapshot.paramMap.get('id');
    this.users = this.userService.users$;
    this.posts = this.userService.posts$.pipe(map(posts => posts.filter(posts => posts.userId === this.id)));
    // this.initMap();
    this.updateForm(this.id);
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
  }
  updateForm(id: number): void {
    this.isNotEditable = true;
    this.user = this.userService.getUser(id);
    this.posts = this.userService.posts$.pipe(map(posts => posts.filter(posts => posts.userId === id)));

    // this.user.subscribe(user => {
    //   this.map.setView([user.address.geo.lat, user.address.geo.lng], 3),
    //   L.marker([user.address.geo.lat, user.address.geo.lng]).addTo(this.map)
    // });

    this.posts.subscribe(posts => {
      this.dataSource = new MatTableDataSource(posts);
      this.dataSource.paginator = this.paginator;
    });
  }

  toggleEdit(): void {
    if(this.isNotEditable) {
      this.isNotEditable = false;
    }
    else {
      this.isNotEditable = true;
    }
  }

  onSubmit(user: User): void {
    console.log(user);
    this.snackBar.open(user.name + ' updated', 'close', {duration: 2000});
    this.toggleEdit();
  }

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [ 39.8282, -98.5795 ],
  //     zoom: 3
  //   });
  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });
  
  //   tiles.addTo(this.map);
  // }
}
