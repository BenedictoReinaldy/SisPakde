# flask --app app run --debug
# .venv\Scripts\activate

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)
CORS(app)

# Ganti dengan path file CSV yang sesuai dengan dataset Anda
file_path = "skenario3.csv"
dataset = pd.read_csv(file_path, header=0)

X = dataset.iloc[:, :-1]
y = dataset.iloc[:, -1]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

random_forest_model = RandomForestClassifier(n_estimators=100, random_state=42)
random_forest_model.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict_diabetes():
    data = request.get_json()
    user_input = np.array([[data['gender'], data['gdp'], data['gd2p'], data['tekanandarah'], data['usia']]])
    prediction = random_forest_model.predict(user_input)

    return jsonify({'result': 'Diabetes Mellitus tipe 1' if prediction[0] == 0 else 'Diabetes Mellitus tipe 2'})

if __name__ == '__main__':
    app.run(debug=True)
