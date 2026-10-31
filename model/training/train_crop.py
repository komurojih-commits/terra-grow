"""
TerraGrow - Crop Recommendation Model Trainer
Trains a Random Forest classifier on the Crop Recommendation dataset.
Outputs:
  - ../saved/crop_model.pkl
  - ../saved/crop_encoder.pkl
"""

import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder

# ---------- Paths ----------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATASET_PATH = os.path.join(BASE_DIR, "datasets", "crop_recommendation.csv")
SAVE_DIR = os.path.join(BASE_DIR, "saved")
os.makedirs(SAVE_DIR, exist_ok=True)

# ---------- Load ----------
print("Loading dataset...")
df = pd.read_csv(DATASET_PATH)
print(f"   Shape: {df.shape}")
print(f"   Crops: {df['label'].nunique()}")

# ---------- Split features/label ----------
FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
X = df[FEATURES]
y = df["label"]

# ---------- Encode labels ----------
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# ---------- Split ----------
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# ---------- Train ----------
print("\nTraining Random Forest...")
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=None,
    random_state=42,
    n_jobs=-1
)
model.fit(X_train, y_train)

# ---------- Evaluate ----------
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"\nAccuracy: {acc * 100:.2f}%\n")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# ---------- Save ----------
model_path = os.path.join(SAVE_DIR, "crop_model.pkl")
encoder_path = os.path.join(SAVE_DIR, "crop_encoder.pkl")
joblib.dump(model, model_path)
joblib.dump(le, encoder_path)
print(f"Saved model   -> {model_path}")
print(f"Saved encoder -> {encoder_path}")
print("\nStep 1.2 complete.")