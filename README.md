# BeroerteCheck
BeroerteCheck is an Angular app that predicts the chance of having a stroke. Created with Tensorflow js (model is trained in Python on Google Colab). Trained data is from Kaggle.

Link to the deployed app: https://beroerte-check.surge.sh/

## Angular app
You can find and run the angular app in the <code>angular-heart-stroke-pred-app</code> folder.

## Data exploration & sanitization, trained model
You can find the used dataset in the <code>data-training</code> folder. You can find more info in the Python notebook about the data and the used dataset. Model config (Colab, early stopping, 208 epochs): (DNN(Adam,0.001) [Dense(10, relu), Dense(64, relu), Dense(8, relu), Dense(4, relu), Dense(1, sigmoid)]).
