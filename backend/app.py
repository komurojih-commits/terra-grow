from flask import Flask
from flask_cors import CORS
from routes.crop_routes import crop_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(crop_bp, url_prefix="/api")

@app.route("/")
def home():
    return {
        "project": "TerraGrow",
        "status": "running",
        "version": "1.0",
        "endpoints": {"crop_predict": "POST /api/predict-crop"}
    }

if __name__ == "__main__":
    print("\nTerraGrow Backend starting...")
    print("Open: http://localhost:5000\n")
    app.run(host="0.0.0.0", port=5000, debug=True)