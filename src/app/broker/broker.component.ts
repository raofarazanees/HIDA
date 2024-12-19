import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@cdx/authentication';

@Component({
  selector: 'app-page-broker',
  styleUrls: ['../app.component.scss', './broker.component.scss'],
  templateUrl: './broker.component.html'
})
export class BrokerComponent implements OnInit {
  @Output() userAuthenticated = new EventEmitter<boolean>();

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const authCode = this.route.snapshot.paramMap.get('authCode');

    if (authCode) {
      const isSessionCreated = await this.authService.createSession(authCode);
      const referrer: string[] = (this.route.snapshot.queryParams.referrer || '').split('/').slice(2);
      const route: string[] = isSessionCreated && referrer.length ? referrer : ['/'];

      this.router.navigate(route);
    } else {
      this.authService.logout();
    }
  }
}
