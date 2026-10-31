from flask import Blueprint, request, jsonify
import joblib
import numpy as np
import os

crop_bp = Blueprint("crop", __name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH = os.path.join(BASE_DIR, "model", "saved", "crop_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "saved", "crop_encoder.pkl")

model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)

FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

@crop_bp.route("/predict-crop", methods=["POST"])
def predict_crop():
    try:
        data = request.get_json()
        missing = [f for f in FEATURES if f not in data]
        if missing:
            return jsonify({"error": "Missing fields", "missing": missing}), 400

        X = np.array([[float(data[f]) for f in FEATURES]])
        encoded_pred = model.predict(X)[0]
        crop_name = encoder.inverse_transform([encoded_pred])[0]
        proba = model.predict_proba(X)[0]
        confidence = float(max(proba)) * 100

        top3_idx = np.argsort(proba)[-3:][::-1]
        top3 = [
            {"crop": encoder.inverse_transform([i])[0],
             "confidence": round(float(proba[i]) * 100, 2)}
            for i in top3_idx
        ]

        return jsonify({
            "success": True,
            "recommended_crop": crop_name,
            "confidence": round(confidence, 2),
            "top_3": top3
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500