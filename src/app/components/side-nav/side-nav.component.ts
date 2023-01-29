import { Component, Input } from '@angular/core';
import { NavigationPathEnum } from 'src/app/constants/navigationPath.enum';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() appName: string;
  @Input() appVersion: string;

  public isExpanded: boolean = true;

  public problemsPath: string = NavigationPathEnum.PROBLEM;
  public datasetsPath: string = NavigationPathEnum.DATASET;
  public modelsPath: string = NavigationPathEnum.DUMMY;

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}


