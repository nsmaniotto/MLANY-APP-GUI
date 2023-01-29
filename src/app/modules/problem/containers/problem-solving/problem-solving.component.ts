import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Go } from 'src/app/actions/goActions';
import { ModelTraining } from 'src/app/modules/model/models/modelTraining';
import { ModelTrainingService } from 'src/app/modules/model/services/modelTraining.service';
import { ProblemSolving } from '../../models/problemSolving';
import { ProblemSolvingService } from '../../services/problemSolving.service';

@Component({
  selector: 'app-problem-solving',
  templateUrl: './problem-solving.component.html',
  styleUrls: ['./problem-solving.component.css']
})
export class ProblemSolvingComponent {
  private problemSolvingId: number;
  problemSolving: ProblemSolving;
  isProblemSolvingLoaded: boolean;

  constructor(
    private readonly modelTrainingService: ModelTrainingService,
    private readonly problemSolvingService: ProblemSolvingService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.problemSolvingId = Number(params.id);
      this.getProblemSolving();
    });
  }

  getProblemSolving() {
    this.problemSolvingService.getProblemSolving(this.problemSolvingId).subscribe(value => {
      if (value) {
        this.problemSolving = value;
        this.isProblemSolvingLoaded = true;
      }
    });
  }

  deployModelFromTraining(modelTrainingId: number) {
    this.modelTrainingService.deployModelFromTraining(modelTrainingId).subscribe(updatedProblemId => {
      if (updatedProblemId) {
        this.router.navigate([`/problem/view/${updatedProblemId}`]);
      }
    });
  }
}
