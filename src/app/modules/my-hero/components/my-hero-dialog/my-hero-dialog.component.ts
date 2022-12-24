import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import {distinctUntilChanged, filter, map, startWith, take, takeUntil} from "rxjs/operators";

import { MyHeroStoreService } from "../../store/services/my-hero-store.service";
import {
  MyHero,
  MyHeroAfterCloseValue,
  MyHeroNode,
  MyHeroType,
  MyHeroValidationError
} from "../../models/my-hero-interface.model";
import { PredefinedValidationMessages } from "../../validators/validation.models";
import { MyHeroComponents, MyHeroFieldTypes, MyHeroTypesName } from "../../constants/my-hero.constants";
import { MyHeroFomFieldErrors, MyHeroPropertyIdError } from "../../constants/my-hero-form-error.constants";
import {
  DescriptionTextMaxLength,
  regexIntegerPattern,
  StandardInputMaxLength
} from "../../validators/validation.constants";
import { noWhitespaceValidator } from "../../validators/no-white-spase.validator";
import { ComparisonErrorStateMatcher, MatchingValidator } from "../../validators/matching.validator";

@Component({
  selector: 'app-my-hero-dialog',
  templateUrl: './my-hero-dialog.component.html',
  styleUrls: ['./my-hero-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyHeroDialogComponent implements OnInit, OnDestroy {
  public myHeroForm: FormGroup;
  public typeGroup: FormGroup;
  public lengthMatcher = new ComparisonErrorStateMatcher();
  public isEditMode = false;
  public components: string[] = MyHeroComponents;
  public filteredComponentsName$: Observable<string[]>;
  public types: MyHeroType[] = MyHeroTypesName;
  public fieldFormats: string[];
  public fieldsControl: FormArray;
  public destroy$ = new Subject<boolean>();
  public isShowWarning: boolean = true;
  public errorMessage: string = '';
  public errorElementIDMessage: string = '';
  public isLoading$: Observable<boolean>;
  public formFieldsErrors: PredefinedValidationMessages = MyHeroFomFieldErrors;
  private nameValue: string = '';
  private groupNameValue: string = '';

  private static prepareFormData(formValue: MyHero): MyHeroNode {
    delete formValue.isClone;
    formValue.name = formValue.name.trim();
    formValue.groupName = formValue.groupName.trim();
    formValue.synonyms = formValue.synonyms ? formValue.synonyms.trim() : null;
    formValue.description = formValue.description ? formValue.description.trim() : null;
    if (formValue.type.typeName === 'List') {
      formValue.type.options = formValue.type.options.map(item => item.trim());
    }
    return formValue;
  }

  constructor(
      public dialogRef: MatDialogRef<MyHeroDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private myHeroStoreService: MyHeroStoreService,
      private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.initForm();

    const nameControl: FormControl = this.getControl('myHeroForm', 'name');
    const groupNameControl: FormControl = this.getControl('myHeroForm', 'groupName');
    const propertyIdControl: FormControl = this.getControl('myHeroForm', 'propertyId');

    this.typesNameChangeSubscription();
    this.propertyIdChangeSubscription(nameControl, 'name');
    this.propertyIdChangeSubscription(groupNameControl, 'groupName');
    this.groupNameChangeSubscription(groupNameControl);
    this.propertyIdSubscription(propertyIdControl, nameControl, groupNameControl);
    this.getMyHeroErrorMessage();

    this.isLoading$ = this.myHeroStoreService.createMyHeroProgress$();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public getControl(groupName: string, fieldName: string, index?: number): FormControl {
    const control = this[groupName].get(fieldName);
    if (index !== undefined) {
      return (control as FormArray).at(index) as FormControl;
    } else {
      return control as FormControl;
    }
  }

  public getError(groupName: string, fieldName: string, index?: number): string {
    const control: FormControl = this.getControl(groupName, fieldName, index);

    if (this.typeGroup.hasError('incorrect')) {
      this.typeGroup.controls['maxLength'].setErrors({ incorrect: true });
    } else {
      this.typeGroup.controls['maxLength'].updateValueAndValidity();
    }

    return this.getErrorMessage(fieldName, control, this.formFieldsErrors);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public submitForm(): void {
    if (this.myHeroForm.invalid) {
      return;
    }

    const formValue: MyHero = this.myHeroForm.getRawValue();
    const data: MyHeroNode = MyHeroDialogComponent.prepareFormData({ ...formValue });
    const afterCloseValue: MyHeroAfterCloseValue = {
      name: data.name,
      isClone: formValue.isClone
    };

    this.myHeroStoreService.createMyHero(data);

    this.closeDialogOnSuccessAction(afterCloseValue);
  }

  public addNewField(): void {
    this.fieldsControl.push(this.generateNewFields());
  }

  public removeNewField(index: number): void {
    this.fieldsControl.removeAt(index);
  }

  public closeBanner(): void {
    this.isShowWarning = !this.isShowWarning;
  }

  public closeErrorBanner(): void {
    this.errorMessage = '';
    this.errorElementIDMessage = '';
  }

  private initForm(): void {
    this.myHeroForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(StandardInputMaxLength),
        noWhitespaceValidator
      ]],
      propertyId: [''],
      groupName: ['', [
        Validators.required,
        noWhitespaceValidator
      ]],
      synonyms: [null, [
        Validators.maxLength(StandardInputMaxLength),
        noWhitespaceValidator
      ]],
      description: [null, [
        Validators.maxLength(DescriptionTextMaxLength),
        noWhitespaceValidator
      ]],
      type: this.fb.group({
        typeName: ['', Validators.required],
        format: null,
        isNegative: false,
        minLength: null,
        maxLength: null
      }, {
        validator: MatchingValidator
      }),
      isClone: false,
      isCustom: true
    });

    this.typeGroup = this.myHeroForm.get('type') as FormGroup;
  }

  private typesNameChangeSubscription(): void {
    const elementNameControl= this.typeGroup.get('typeName') as FormControl;
    elementNameControl.valueChanges
        .pipe(
            distinctUntilChanged(),
            takeUntil(this.destroy$)
        )
        .subscribe(value => {
          this.fieldFormats = MyHeroFieldTypes[value] ?? [];
          if (this.typeGroup.invalid) {
            this.updateTypeGroupValidation(value);
          }
          this.typeGroup.get('format').patchValue(this.fieldFormats[0] ?? null);

          if (value === 'SinglelineText' || value === 'MultilineText') {
            this.addLengthValidation();
          }
          if (value === 'List') {
            this.addListValidation();
          }
        });
  }

  private updateTypeGroupValidation(value: string): void {
    this.typeGroup.get('minLength').patchValue(null);
    this.typeGroup.get('maxLength').patchValue(null);
    this.updateValidation('typeGroup', 'minLength');
    this.updateValidation('typeGroup', 'maxLength');
    if (value !== 'List') {
      delete this.typeGroup.controls['options'];
    }
  }

  private updateValidation(formName: string, controlName: string): void {
    this[formName].controls[controlName].clearValidators();
    this[formName].controls[controlName].updateValueAndValidity();
  }

  private propertyIdChangeSubscription(control: FormControl, name: string): void {
    control.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    ).subscribe((value: string) => {
      this[name + 'Value'] = value.trim().toLowerCase().replace(/ /g, '_');
      const point = this.groupNameValue && this.nameValue ? '.' : '';
      const propertyIdValue = this.groupNameValue + point + this.nameValue;

      if (propertyIdValue !== this.myHeroForm.get('propertyId').value) {
        this.myHeroForm.get('propertyId').patchValue(propertyIdValue);
      }
    });
  }

  private propertyIdSubscription(
      propertyIdControl: FormControl,
      nameControl: FormControl,
      groupNameControl: FormControl): void {
    propertyIdControl.valueChanges.pipe(
        filter(Boolean),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    ).subscribe(() => {
      if (nameControl.errors || groupNameControl.errors) {
        nameControl.updateValueAndValidity();
        groupNameControl.updateValueAndValidity();
      }
    });
  }

  private groupNameChangeSubscription(control: FormControl): void {
    this.filteredComponentsName$ = control.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        map(value => this.filter(value || ''))
    );
  }

  private addLengthValidation(): void {
    const maxValue = this.typeGroup.get('typeName').value === 'SinglelineText' ?
        StandardInputMaxLength : DescriptionTextMaxLength;
    const controlMin = this.getControl('typeGroup', 'minLength');
    const controlMax = this.getControl('typeGroup', 'maxLength');

    controlMin.setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern(regexIntegerPattern),
          Validators.min(1)
        ])
    );
    controlMin.updateValueAndValidity();

    controlMax.setValidators(
        Validators.compose([
          Validators.required,
          Validators.pattern(regexIntegerPattern),
          Validators.max(maxValue)
        ])
    );
    controlMax.updateValueAndValidity();

    this.formFieldsErrors['minLength']['min'] = `Length area 1-${maxValue}`;
    this.formFieldsErrors['maxLength']['max'] = `Length area 1-${maxValue}`;
    this.typeGroup.get('minLength').patchValue(1);
    this.typeGroup.get('maxLength').patchValue(maxValue);
  }

  private addListValidation(): void {
    this.typeGroup.addControl('options', this.fb.array([this.generateNewFields()]));
    this.fieldsControl = this.typeGroup.get('options') as FormArray;
  }

  private generateNewFields(): FormControl {
    return this.fb.control('', [
      Validators.maxLength(StandardInputMaxLength),
      noWhitespaceValidator,
      Validators.required
    ]);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.components.filter(option => option.toLowerCase().includes(filterValue));
  }

  private closeDialogOnSuccessAction(afterCloseValue: MyHeroAfterCloseValue): void {
    this.myHeroStoreService.createMyHeroSuccessAction$()
        .pipe(
            filter(Boolean),
            take(1)
        )
        .subscribe(() => this.dialogRef.close(afterCloseValue));
  }

  private getMyHeroErrorMessage(): void {
    this.myHeroStoreService.createMyHeroFailureAction$()
        .pipe(
            filter(Boolean),
            takeUntil(this.destroy$)
        )
        .subscribe((error: HttpErrorResponse) => {
          if (error.statusText === 'validationError') {
            // this.addErrorToControl(error.meta);
          } else {
            this.errorMessage = error.message;
            this.cdr.markForCheck();
          }
        });
  }

  private addErrorToControl(meta: MyHeroValidationError[]): void {
    meta.forEach((item: MyHeroValidationError) => {
      let property: string;
      let form: string;

      if (item.property === 'propertyId') {
        this.myHeroForm.controls['name'].setErrors({ incorrect: true });
        this.myHeroForm.controls['groupName'].setErrors({ incorrect: true });
        this.errorElementIDMessage = MyHeroPropertyIdError;
        this.cdr.markForCheck();
      }
      if (item.property.includes('/')) {
        property = item.property.split('/').pop();
        form = 'typeGroup';
        if (property === 'maxLength') {
          this.myHeroForm.controls['type'].setErrors({ incorrect: true });
        }
      } else {
        property = item.property;
        form = 'myHeroForm';
      }

      this.formFieldsErrors[property]['incorrect'] = item.message;
      this[form].controls[property].setErrors({ incorrect: true });
      this.getError(form, property);
    });
  }

  private getErrorMessage(
      fieldName: string,
      control: FormControl,
      predefinedMessages: PredefinedValidationMessages): string {
    return control.errors && Object.keys(control.errors)
        .filter((errorKey: string) => control.hasError(errorKey))
        .map((errorKey: string): string => {
          const fieldErrors: { [errorKey: string]: string } = predefinedMessages[fieldName];
          return fieldErrors && fieldErrors[errorKey];
        })[0];
  }
}
