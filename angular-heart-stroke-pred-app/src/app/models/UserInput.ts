export class UserInput {
    gender: number;
    age: number;
    hypertension: number;
    heartDisease: number;
    everMarried: number;
    workType: number;
    residenceType: number;
    avgGlucoseLevel: number;
    bmi: number;
    smoking: number;

    constructor(
        gender: number,
        age: number,
        hypertension: number,
        heartDisease: number,
        everMarried: number,
        workType: number,
        residenceType: number,
        avgGlucoseLevel: number,
        bmi: number,
        smoking: number
    ) {
        this.gender = gender;
        this.age = age;
        this.hypertension = hypertension;
        this.heartDisease = heartDisease;
        this.everMarried = everMarried;
        this.workType = workType;
        this.residenceType = residenceType;
        this.avgGlucoseLevel = avgGlucoseLevel;
        this.bmi = bmi;
        this.smoking = smoking;
    }
}