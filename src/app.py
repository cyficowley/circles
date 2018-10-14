import scraper
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

api = Api(app)
 
class getData(Resource):
    def get(self, userName):
        return {'data': scraper.scrape(userName)}

api.add_resource(getData, '/scraper/<userName>')

if __name__ == '__main__':
     app.run(debug=True)

