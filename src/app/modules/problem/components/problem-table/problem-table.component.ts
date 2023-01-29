import { Component, Input, OnInit } from '@angular/core';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'app-problem-table',
  templateUrl: './problem-table.component.html',
  styleUrls: ['./problem-table.component.css']
})
export class ProblemTableComponent{
  @Input() problems: Problem[];

  displayedColumns: string[] = ['id', 'name', 'type', 'action'];
}
