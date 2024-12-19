import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@cdx/authentication';

@Component({
  selector: 'app-page-unauthorized',
  styleUrls: ['../app.component.scss'],
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit {
  constructor(public router: Router, public session: SessionService) {}

  ngOnInit() {
    if (this.session.hasSession()) {
      this.router.navigate(['/']);
    }
  }
}
