import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../interfaces';
import {ProfileService} from '../../services/profile.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  links = [
    {url: '/home', name: 'Home'},
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'}
  ];
  profile$: Observable<User>;
  isOpenedSidebar = true;
  innerWidth;

  constructor(
    private auth: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 1024) {
      this.isOpenedSidebar = false;
    }

    this.profile$ = this.profileService.getProfile();
  }

  onToggleSidebar(event) {
    this.isOpenedSidebar = event;
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
