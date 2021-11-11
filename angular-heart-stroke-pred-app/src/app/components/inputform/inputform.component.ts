import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserInput } from 'src/app/models/UserInput';
import { PredictionService } from 'src/app/services/prediction.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-inputform',
  templateUrl: './inputform.component.html',
  styleUrls: ['./inputform.component.css']
})

export class InputformComponent implements OnInit {

  constructor(private predService: PredictionService, private _snackbar: MatSnackBar, private router: Router) { }

  genders = ['Man', 'Vrouw', 'Anders']
  workTypes = ['Nog kind', 'Private sector', 'Nooit gewerkt', 'Zelfstandig', 'Overheid']
  residenceTypes = ['Platteland', 'Stedelijk']
  smokingStatus = ['Nooit gerookt', 'In het verleden gerookt', 'Rookt']

  testInputForm = new FormGroup({
    gender: new FormControl('', [
      Validators.required
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]$|^[1-9][0-9]$|^[1][0-5][0-9]$")
    ]),
    hypertension: new FormControl('', [
      Validators.required
    ]),
    heartDisease: new FormControl('', [
      Validators.required
    ]),
    everMarried: new FormControl('', [
      Validators.required
    ]),
    workType: new FormControl('', [
      Validators.required
    ]),
    residenceType: new FormControl('', [
      Validators.required
    ]),
    avgGlucoseLevel: new FormControl('', [
      Validators.min(0),
      Validators.max(200)
    ]),
    bmi: new FormControl('', [
      Validators.required
    ]),
    smoking: new FormControl('', [
      Validators.required
    ])
  })

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    localStorage.clear();
  }

  openSnackBar(): void {
    this._snackbar.open("Er is een fout opgetreden, probeer het opnieuw!", "OK");
  }

  /**
   * Converts avg glucose level from mmol/L to mg/dL.
   * Needed for prediction.
   * @param avgGlucoseLevel in mmol/L
   * @returns avg glucose level in mg/dL
   */
  convertGlucoseLevel(avgGlucoseLevel: number) {
    return avgGlucoseLevel * 18.0182
  }

  onSubmit(): void {
    if (this.testInputForm.valid) {
      let gender = this.testInputForm.get('gender')?.value
      let age = this.testInputForm.get('age')?.value
      let hypertension = this.testInputForm.get('hypertension')?.value
      let heartDisease = this.testInputForm.get('heartDisease')?.value
      let everMarried = this.testInputForm.get('everMarried')?.value
      let workType = this.testInputForm.get('workType')?.value
      let residenceType = this.testInputForm.get('residenceType')?.value
      let avgGlucoseLevel = this.testInputForm.get('avgGlucoseLevel')?.value

      if (avgGlucoseLevel == null) avgGlucoseLevel = 119.95591240875909

      avgGlucoseLevel = this.convertGlucoseLevel(avgGlucoseLevel);

      console.log(`avg: ${avgGlucoseLevel}`)

      let bmi = this.testInputForm.get('bmi')?.value
      let smoking = this.testInputForm.get('smoking')?.value

      let newUserInput = new UserInput(
        gender,
        age,
        hypertension,
        heartDisease,
        everMarried,
        workType,
        residenceType,
        avgGlucoseLevel,
        bmi,
        smoking
      );

      this.predService.predict(newUserInput)
        .then((result: number) => {
          localStorage.setItem("predictResult", result.toString())

          this.router.navigate(['/Result'])
        })
        .catch((err) => {
          console.log(err);
          this.openSnackBar();
        });
    } else {

      this.openSnackBar();
    }

  }
}
