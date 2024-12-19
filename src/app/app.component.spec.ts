import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, SessionService } from '@cdx/authentication';
import { WindowRef } from '@cdx/services/window';
import * as PubSub from 'pubsub-js';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

const mockSessionService = jasmine.createSpyObj('SessionService', ['hasSession', 'isExpired', 'updateTokenFromStorage', 'expire']);
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of({}));
  dispatch = jasmine.createSpy();
  pipe = jasmine.createSpy().and.returnValue(of('success'));
}

describe('AppComponent', () => {
  const mockLocation = { href: 'apps.clarivate.com' };
  let authenticationService: AuthenticationService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let windowRef: WindowRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, SharedModule, CoreModule],
      declarations: [AppComponent],
      providers: [WindowRef, { provide: SessionService, useValue: mockSessionService },
        {
          provide: Store,
          useClass: StoreMock
        },
        {
          provide: Actions,
          useClass: StoreMock
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        authenticationService = TestBed.inject(AuthenticationService);
        windowRef = TestBed.inject(WindowRef);
      });
  }));

  describe('default state when user is not logged in', () => {
    beforeEach(() => {
      mockSessionService.hasSession.and.returnValue(false);
      mockSessionService.isExpired.and.returnValue(true);
      component.onActivate();
    });

    it('should exist', () => {
      expect(component).toBeTruthy();
    });

    it('should have a <router-outlet> component', () => {
      const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));

      expect(routerOutlet).toBeDefined();
    });

    it('should not show the <app-header> component', () => {
      const header = fixture.debugElement.query(By.css('app-header'));

      expect(header).toBeNull();
    });

    it('should set userAuthenticated to false', () => {
      expect(component.userAuthenticated).toEqual(false);
    });
  });

  describe('default state when user is logged in', () => {
    beforeEach(() => {
      mockSessionService.hasSession.and.returnValue(true);
      mockSessionService.isExpired.and.returnValue(false);
      component.onActivate();
    });

    it('should have a <router-outlet> component', () => {
      const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));

      expect(routerOutlet).toBeDefined();
    });

    it('should have a <app-header> component', () => {
      const header = fixture.debugElement.query(By.css('app-header'));

      expect(header).toBeDefined();
    });

    it('should set userAuthenticated to true when user is logged in', () => {
      expect(component.userAuthenticated).toEqual(true);
    });
  });

  describe('PubSub Logout', () => {
    beforeEach(() => {
      mockSessionService.hasSession.and.returnValue(true);
      mockSessionService.isExpired.and.returnValue(false);
      component.onActivate();
    });

    it('should trigger the subscribed pubsub channel', () => {
      const pubsub = spyOn(PubSub, 'subscribe');
      authenticationService.logout();
      fixture.detectChanges();

      expect(pubsub).toHaveBeenCalledWith('userLoggedOut', jasmine.any(Function));
    });

    it('should set window.location.href accordingly', () => {
      spyOnProperty(windowRef, 'nativeLocation').and.returnValue(mockLocation);
      authenticationService.logout();

      expect(windowRef.nativeLocation.href).toEqual(mockLocation.href);
    });
  });
});
