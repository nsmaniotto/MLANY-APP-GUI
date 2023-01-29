import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Problem } from '../../models/problem';
import { ProblemService } from '../../services/problem.service';
import { ProblemSolvingColumnService } from '../../services/problemSolvingColumn.service';

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.css']
})
export class ProblemDetailsComponent implements OnInit {
  @Input() problem: Problem;

  displayedApiBaseUrl = 'http://127.0.0.1:8080/mlany-app-ws/[predict/feedback]/';

  endPoint: FormControl = new FormControl('');

  jsonPredictionPreview: JSON;

  constructor(
    private readonly problemService: ProblemService,
    private readonly problemSolvingColumnService: ProblemSolvingColumnService
  ) {}

  ngOnInit() {
    this.endPoint = new FormControl(this.problem.endPoint);
    this.initJsonPredictionPreview();
  }

  initJsonPredictionPreview() {
    if (this.problem.deployedModelFromTraining) {
      this.problemSolvingColumnService.getProblemSolvingColumnsByProblemSolvingId(this.problem.deployedModelFromTraining.problemSolvingId).subscribe(columns => {
        if (columns) {
          const inputJson: any = {};
          columns.forEach(column => inputJson[column.name] = '');

          const jsonPredictionRequest: any = {'input':inputJson};
          this.jsonPredictionPreview = jsonPredictionRequest as JSON;
        }
      });
    }
  }

  updateEndPoint() {
    this.problemService.updateEndPoint(this.problem.id, this.endPoint.value).subscribe(value => {
      if (value) {
        this.problem = value;
      }
    });
  }
}


