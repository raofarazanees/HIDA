import { Injectable, NgZone } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SessionService } from '@cdx/authentication';

import { appRoutes } from '../app-routing.module';
import { AuthGuard } from '../guards/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { UnauthorizedComponent } from './unauthorized.component';
import { CoreModule } from './../core/core.module';

@Injectable()
class MockAuthGuard {
  canActivate = () => false;
}

@Injectable()
class MockSessionService extends SessionService {
  hasSession = () => true;
}

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;
  let router: Router;
  let sessionService: SessionService;
  let ngZone: NgZone;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnauthorizedComponent],
      imports: [RouterTestingModule.withRoutes(appRoutes), SharedModule, CoreModule],
      providers: [
        {
          provide: AuthGuard,
          useClass: MockAuthGuard
        },
        {
          provide: SessionService,
          useClass: MockSessionService
        }
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UnauthorizedComponent);
        router = TestBed.inject(Router);
        sessionService = TestBed.inject(SessionService);
        ngZone = TestBed.inject(NgZone);

        component = fixture.componentInstance;
        router.initialNavigation()
        fixture.detectChanges();
      });
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the base url if the user is authenticated', async () => {
    ngZone.run(() => {

    spyOn(sessionService, 'hasSession').and.returnValue(true);
    spyOn(router, 'navigate');   
    component.ngOnInit();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    
    });
  });

  it('should not redirect if the user is not authenticated', async () => {
    spyOn(sessionService, 'hasSession').and.returnValue(false);
    spyOn(router, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
  });

});
