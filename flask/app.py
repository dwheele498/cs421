from flask import Flask
from flask_restful import Api, reqparse
from users import UserLogin, UserRegister 
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'secretkey'
api = Api(app)
cors = CORS(app)


api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin, '/login')

if __name__ == '__main__':
    app.run(port=5000, debug=True)