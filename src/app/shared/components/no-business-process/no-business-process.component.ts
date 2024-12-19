import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-no-business-process',
  templateUrl: './no-business-process.component.html',
  styleUrls: ['./no-business-process.component.scss']
})
export class NoBusinessProcessComponent implements OnInit {
  businessProcess = '';
  constructor(protected readonly route: ActivatedRoute) {
    this.businessProcess = route.snapshot.data['title'];
  }

  ngOnInit() {}
}
