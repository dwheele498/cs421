from flask import Flask
from flask_restful import Api, reqparse
from users import UserLogin, UserRegister 
from flask_cors import CORS
from properties import NewProperty, ViewProperty, ImageProperty

app = Flask(__name__)
app.secret_key = 'secretkey'
api = Api(app)
cors = CORS(app)


api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin, '/login')
api.add_resource(NewProperty, '/property/new')
api.add_resource(ViewProperty, '/property/view')
api.add_resource(ImageProperty,'/property/new/img')

if __name__ == '__main__':
    app.run(port=5000, debug=True)