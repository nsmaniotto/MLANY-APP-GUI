import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { NavigationPathEnum } from 'src/app/constants/navigationPath.enum';
import { DatasetImportButton } from 'src/app/modules/dataset/components/dataset-import-button.component/dataset-import-button.component';
import { Dataset } from 'src/app/modules/dataset/models/dataset';
import { DatasetService } from 'src/app/modules/dataset/services/dataset.service';
import { ProblemFieldMaxLength, ProblemFieldMinLength } from '../../models/problem';

@Component({
  selector: 'app-problem-initialization-step-form',
  templateUrl: './problem-initialization-step-form.component.html',
  styleUrls: ['./problem-initialization-step-form.component.css']
})
export class ProblemInitializationStepFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() onFormChange = new EventEmitter<FormGroup>();

  public readonly problemNameFieldMinLength = ProblemFieldMinLength.NAME;
  public readonly problemNameFieldMaxLength = ProblemFieldMaxLength.NAME;

  @ViewChild('datasetSelector', { static: false }) datasetSelector: MatSelect;
  @ViewChild('datasetImportButton', { static: false }) datasetImportButton: DatasetImportButton;

  public datasetSuggestions: Dataset[] = [];
  public datasetImportErrorMessage: string | null;

  constructor(
    private readonly datasetService: DatasetService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.onFormChange.emit(this.formGroup);
    });

    this.loadProblemSuggestions();

    // 'dataset' form control must have a default value for type purpose
    // Reset its value to prevent required validator from being always checked
    this.formGroup.patchValue({ dataset: null });
  }

  private loadProblemSuggestions(): void {
    this.datasetService.getDatasets().subscribe(suggestions => {
      if (suggestions) {
        this.datasetSuggestions = suggestions;
      }
    });
  }

  public cancelProblemCreation(): void {
    this.router.navigate([NavigationPathEnum.PROBLEM]);
  }

  public handleDatasetSelectorClick(): void {
    if (this.datasetSuggestions.length === 0) {
      this.datasetImportButton.openFileSelector();
    }
  }

  public handleDatasetUpload(uploadDataset: Dataset): void {
    this.datasetImportErrorMessage = null;
    this.datasetSuggestions.push(uploadDataset);
    this.formGroup.patchValue({ dataset: uploadDataset });
    this.datasetSelector.close();
  }

  public handleDatasetImportError(errorMessage: string): void {
    this.datasetImportErrorMessage = errorMessage;
    this.datasetSelector.close();
  }
}
