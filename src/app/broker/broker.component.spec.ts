import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router, Params } from '@angular/router';
import { AuthenticationService } from '@cdx/authentication';

import { appRoutes } from '../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { BrokerComponent } from './broker.component';

const mockAuthService = jasmine.createSpyObj('AuthenticationService', ['createSession', 'logout']);

describe('BrokerComponent', () => {
  let component: BrokerComponent;
  let fixture: ComponentFixture<BrokerComponent>;
  let router: Router;

  function comfigureTestingModule(paramMapParams: Params, queryParams: Params = {}) {
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule.withRoutes(appRoutes), SharedModule],
      declarations: [BrokerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(paramMapParams),
              queryParams
            }
          }
        },
        {
          provide: AuthenticationService,
          useValue: mockAuthService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BrokerComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        fixture.ngZone.run(() => router.initialNavigation());
        fixture.detectChanges();
      });
  }

  describe('authCode exists, but not session', () => {
    beforeEach(waitForAsync(() => {
      comfigureTestingModule({ authCode: '123' });
    }));

    it('should not logout', waitForAsync(() => {
      component.ngOnInit().then(() => {
        expect(mockAuthService.logout).not.toHaveBeenCalled();
      });
    }));
  });

  describe('authCode exists', () => {
    beforeEach(waitForAsync(() => {
      comfigureTestingModule({ authCode: '123' }, { referrer: '/cdx/home' });
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not logout', waitForAsync(() => {
      component.ngOnInit().then(() => {
        expect(mockAuthService.logout).not.toHaveBeenCalled();
      });
    }));

    it('should create session and redirect to /home while excluding the app id', waitForAsync(() => {
      spyOn(router, 'navigate');

      mockAuthService.createSession.and.returnValue(true);

      fixture.ngZone.run(() => {
        component.ngOnInit().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(router.navigate).toHaveBeenCalledWith(['home']);
          });
        });
      });
    }));
  });

  describe('authCode does not exist', () => {
    beforeEach(waitForAsync(() => {
      comfigureTestingModule({ authCode: null });
    }));

    it('should logout', waitForAsync(() => {
      component.ngOnInit().then(() => {
        expect(mockAuthService.logout).toHaveBeenCalled();
      });
    }));
  });

  describe('nested route referrer', () => {
    beforeEach(waitForAsync(() => {
      comfigureTestingModule({ authCode: 123 }, { referrer: '/cdx/home/child-route' });
    }));

    it('should create session and redirect to the nested route', waitForAsync(() => {
      spyOn(router, 'navigate');

      mockAuthService.createSession.and.returnValue(true);
      component.ngOnInit().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['home', 'child-route']);
      });
    }));
  });

  describe('missing referrer', () => {
    beforeEach(waitForAsync(() => {
      comfigureTestingModule({ authCode: 123 }, { referrer: '/' });
    }));

    it('should create session and redirect to the fallback route', waitForAsync(() => {
      spyOn(router, 'navigate');

      mockAuthService.createSession.and.returnValue(true);
      component.ngOnInit().then(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    }));
  });
});
