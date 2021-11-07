import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { UserInput } from '../models/UserInput';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor() { }

  async predict(userInput: UserInput): Promise<number> {
    const model = await tf.loadLayersModel('../../assets/model/model.json')

    const {
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
    } = userInput;

    const values = tf.tensor([
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
    ]).expandDims();

    const prediction = model.predict(values) as any;

    const result = tf.squeeze(prediction, [0]);

    const arr = result.dataSync();

    return arr[0];
  }
}
