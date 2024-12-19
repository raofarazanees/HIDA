import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService, SessionService } from '@cdx/authentication';

import { appRoutes } from '../app-routing.module';
import { CoreModule } from './../core/core.module';
import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './auth-guard.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { UserProfileService } from '@sgty/services/userprofile';

const routerMockService = jasmine.createSpyObj('Router', ['navigate', 'queryParams']);

@Injectable()
class MockSessionService extends SessionService {
  hasSession = () => true;
  isExpired = () => false;
}

let authGuard: AuthGuard | any;
let router: Router;
let store: MockStore | any;
let sessionService: SessionService;
let userProfileService: UserProfileService;

describe('AuthGuard', () => {
  const initialState = { common: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes), CoreModule, SharedModule, StoreModule.forRoot({})],
      providers: [
        {
          provide: SessionService,
          useClass: MockSessionService
        },
        provideMockStore({ initialState })
      ]
    });
    store = TestBed.inject(MockStore);
    sessionService = TestBed.inject(SessionService);
    userProfileService = TestBed.inject(UserProfileService);
    router = TestBed.inject(Router);
    authGuard = new AuthGuard(routerMockService, sessionService, store, userProfileService);
    authGuard.CONFIG = { production: true };
    spyOn(userProfileService, 'getUserProfile').and.returnValue({ first_name: 'fName', last_name: 'lName' });
  });

  describe('canActivate', () => {
    it('should return true for a logged in user', () => {
      expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toEqual(true);
    });

    it('should return false when the session has expired', () => {
      spyOn(sessionService, 'hasSession').and.returnValue(false);
      spyOn(sessionService, 'isExpired').and.returnValue(true);

      expect(authGuard.canActivate(new ActivatedRouteSnapshot())).toEqual(false);
    });
  });
});
