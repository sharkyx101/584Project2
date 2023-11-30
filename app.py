from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #enable CORS 

@app.route('/api/file_tempo', methods=['POST', 'GET'])
def file_tempo():
    if request.method == 'POST':
        try:
             
            uploaded_file = request.files['my_audio_file']
            
            #processessing file
            filename = uploaded_file.filename
            
            return jsonify({'status': 'success', 'filename': filename})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    elif request.method == 'GET':
        #return a list of sample responses
        sample_responses = [{'filename': 'sample_file_1.mp3'}, {'filename': 'sample_file_2.mp3'}]
        return jsonify(sample_responses)

if __name__ == '__main__':
    app.run(debug=True)
