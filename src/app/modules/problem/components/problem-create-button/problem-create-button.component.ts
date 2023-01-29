import { Component } from '@angular/core';
import { NavigationPathEnum } from 'src/app/constants/navigationPath.enum';

@Component({
  selector: 'app-problem-create-button',
  templateUrl: './problem-create-button.component.html',
  styleUrls: ['./problem-create-button.component.css']
})
export class ProblemCreateButton {
  public problemCreatePath: string = NavigationPathEnum.PROBLEM_CREATE;
}


