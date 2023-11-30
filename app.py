from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/file_tempo', methods=['POST', 'GET'])
def file_tempo():
    if request.method == 'POST':
        try:
            # Assuming you have a function to process the uploaded file
            uploaded_file = request.files['my_audio_file']
            
            # Process the file (replace this with your actual file processing logic)
            # For demonstration purposes, let's just return the filename
            filename = uploaded_file.filename
            
            return jsonify({'status': 'success', 'filename': filename})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    elif request.method == 'GET':
        # For demonstration purposes, return a list of sample responses
        sample_responses = [{'filename': 'sample_file_1.mp3'}, {'filename': 'sample_file_2.mp3'}]
        return jsonify(sample_responses)

if __name__ == '__main__':
    app.run(debug=True)
