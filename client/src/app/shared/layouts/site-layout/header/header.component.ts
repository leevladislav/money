import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onToggleSidebar = new EventEmitter<boolean>();
  @Input() isOpenedSidebar: boolean;
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;

  constructor(private media: MediaMatcher) {
  }

  ngOnInit() {
    this.mobileWidthListener();
  }

  mobileWidthListener() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => {
      if (this.mobileQuery.matches && this.isOpenedSidebar) {
        this.toggleSidebar(this.isOpenedSidebar = !this.isOpenedSidebar);
      }

      if (!this.mobileQuery.matches && !this.isOpenedSidebar) {
        this.toggleSidebar(this.isOpenedSidebar = !this.isOpenedSidebar);
      }
    };

    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  toggleSidebar(event) {
    this.onToggleSidebar.emit(event);
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
