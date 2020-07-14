import sqlite3
from flask_restful import Resource, reqparse
from pymongo import MongoClient
from flask_cors import CORS

client = MongoClient()
db = client.users
col = db.users






class User:
    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, un):
        result = col.find_one({'username':'admin'})
        if result:
            user = User(result['_id'],result['username'],result['password'])
        else:
            user = None
        return user



    @classmethod
    def pass_check(cls,un, pw):
        user = User.find_by_username(un)
        if user is None:
            return False
        if user.password != pw:
            return False
        return True




class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help="This field cannot be left blank"
        )
    parser.add_argument('password',
    type=str,
    required=True,
    help="This is a required field")


    def post(self):
        data = UserRegister.parser.parse_args()
        if not col.find({'username':data['username']}):
            return {'message':'username in use','details':data['username']},403

        col.insert_one({'username':data['username'],'password':data['password'],'bids':[]})
        return {'message':'user created'},201


class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
        type=str,
        required=True,
        help="This field cannot be left blank"
        )
    parser.add_argument('password',
    type=str,
    required=True,
    help="This is a required field")

    def post(self):
        data = UserLogin.parser.parse_args()
        if col.find_one({'$and':[{'username':data['username'],'password':data['password']}]}):
            details = col.find_one({'username':data['username']})
            details['_id']=str(details['_id'])
            return {'message': 'user successfully logged in','loggedin':True,'data':details},200
        else:
            return {'message':'username or password incorrect','loggedin':False},401

