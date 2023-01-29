import { Component, OnInit } from '@angular/core';
import { Dummy } from '../../models/dummy';
import { DummyService } from '../../services/dummy.service';

@Component({
  selector: 'app-dummy-list',
  templateUrl: './dummy-list.component.html',
  styleUrls: ['./dummy-list.component.css']
})
export class DummyListComponent implements OnInit {
  dummy: Dummy = new Dummy();

  constructor(private readonly dummyService: DummyService) {}

  ngOnInit() {
    this.dummy.id = 2;

    this.dummyService.getDummy(2).subscribe(value => {
      if (value) {
        this.dummy = value;
      }
    });
  }
}


