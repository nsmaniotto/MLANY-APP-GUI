import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dataset } from 'src/app/modules/dataset/models/dataset';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';

@Component({
  selector: 'app-problem-view',
  templateUrl: './problem-view.component.html',
  styleUrls: ['./problem-view.component.css']
})
export class ProblemViewComponent implements OnInit {
  private problemId: number;
  problem: Problem;
  linkedDatasets: Dataset[] = [];
  isProblemLoaded: boolean;

  constructor(
    private readonly problemService: ProblemService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problemId = Number(params.id);
      this.getProblem();
      this.loadLinkedDatasets();
    });
  }

  getProblem() {
    this.problemService.getProblem(this.problemId).subscribe(value => {
      if (value) {
        this.problem = value;
        this.isProblemLoaded = true;
      }
    });
  }

  loadLinkedDatasets() {
    this.problemService.getLinkedDatasets(this.problemId).subscribe(value => {
      if (value) {
        this.linkedDatasets = value;
      }
    });
  }
}


