import { Component } from '@angular/core';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent {
  public problems: Problem[] = [];

  public problemsLoaded = false;

  constructor(private readonly problemService: ProblemService) {}

  ngOnInit() {
    this.loadProblems();
  }

  loadProblems() {
    this.problemService.getProblems().subscribe(value => {
      if (value) {
        this.problems = value;
        this.problemsLoaded = true;
      }
    });
  }
}


