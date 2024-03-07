import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasCursosComponent } from './areas-cursos.component';

describe('AreasCursosComponent', () => {
  let component: AreasCursosComponent;
  let fixture: ComponentFixture<AreasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
