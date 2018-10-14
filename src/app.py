import scraper
from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)
 
class getData(Resource):
    def get(self, userName):
        return {'data': scraper.scrape(userName)}

api.add_resource(getData, '/scraper/<userName>')

if __name__ == '__main__':
     app.run()

