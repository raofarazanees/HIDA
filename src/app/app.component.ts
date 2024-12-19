import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthenticationService, LogoutConfig, SessionService } from '@cdx/authentication';
import { WindowRef } from '@cdx/services/window';
import { subscribe } from 'pubsub-js';

import { APP_NAME } from './core/core.config';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/reducers';
import { SetAppEnvStatus } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  isLoading = false;

  constructor(
    private windowRef: WindowRef,
    private authService: AuthenticationService,
    private sessionService: SessionService,
    private router: Router,
    private readonly appState: Store<ApplicationState>,
  ) {}

  ngOnInit() {
    this.observeUserLogOut();
    this.subscribeRouterEvents();
  }

  onActivate() {
    this.userAuthenticated = this.sessionService.hasSession() && !this.sessionService.isExpired();
  }

  ngOnDestroy(): void {}

  private observeUserLogOut(): void {
    subscribe('userLoggedOut', (message: string, data: LogoutConfig) => {
      this.windowRef.nativeLocation.href = `${this.authService.getLogoutUrl(APP_NAME, this.windowRef.nativeLocation.pathname)}&status=${
        data.scenario
      }`;
    });
  }

  private subscribeRouterEvents(): void {
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
