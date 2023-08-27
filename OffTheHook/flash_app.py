from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})  # This will enable CORS for all routes

@app.route('/', methods=['POST'])
def handle_request():
    data = {'some': 'data'}
    return jsonify(data)

