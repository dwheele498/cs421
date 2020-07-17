from flask import Flask
from flask_restful import Api, reqparse
from users import UserLogin, UserRegister, AddFunds, GetFunds
from bids import AddBid, SellProp
from flask_cors import CORS, logging
from properties import NewProperty, ViewProperty, ImageProperty, AllProperty

app = Flask(__name__)
app.secret_key = 'secretkey'
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


api.add_resource(UserRegister,'/register')
api.add_resource(UserLogin, '/login')
api.add_resource(NewProperty, '/property/new')
api.add_resource(ViewProperty, '/property/view')
api.add_resource(ImageProperty,'/property/new/img')
api.add_resource(AllProperty, '/property/all')
api.add_resource(SellProp, '/bid/sell')
api.add_resource(AddBid,'/bid/add')
api.add_resource(AddFunds,'/manage/addfunds')
api.add_resource(GetFunds,'/manage/checkfunds')




if __name__ == '__main__':
    app.run(port=5000, debug=True)