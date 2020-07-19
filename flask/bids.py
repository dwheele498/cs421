from flask_restful import Resource, reqparse
from flask import request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import urllib.parse

username = urllib.parse.quote_plus('user')
password = urllib.parse.quote_plus('Dvine489')


client = MongoClient('mongodb+srv://'+username+':'+password+'@cluster0.19oll.mongodb.net/<properties>?retryWrites=true&w=majority')

db = client.properties
col = db.properties
udb = client.users
ucol = udb.users


class AddBid(Resource):
    bidparse = reqparse.RequestParser()
    bidparse.add_argument('username',
                          type=str,
                          required=True,
                          help="username cannot be left blank"
                          )
    bidparse.add_argument('bid',
                          type=int,
                          required=True,
                          help="bid cannot be left blank"
                          )
    bidparse.add_argument('_id',
                          type=str,
                          required=True,
                          help="id cannot be left blank"
                          )

    def post(self):
        data = AddBid.bidparse.parse_args()
        # prop = col.find_one({'_id': ObjectId(data['_id'])})
        # newBid = prop['bid'] + data['bid']
        col.update_one({'_id': ObjectId(data['_id'])}, {
                       '$set': {'bid': data['bid']}})
        col.update_one({'_id': ObjectId(data['_id'])},{'$push':{'bidders':data['username']}})
        ucol.update({'username': data['username']}, {
                    '$addToSet': {'bids': data['_id']}})
        print(ucol.find_one({'username':data['username']}))
        return {'message': 'successfully added bid'}, 200


class SellProp(Resource):
    sellparse = reqparse.RequestParser()
    sellparse.add_argument('id', type=str, required=True,
                           help='id is required')
    sellparse.add_argument('username', type=str, required=True,
                           help='username is required')

    def post(self):
        data = SellProp.sellparse.parse_args()
        h = col.find_one({'_id': ObjectId(data['id'])})
        f = h['bid']
        w = col.find_one({'_id': ObjectId(data['id'])},{'bidders':{'$slice':-1}})
        winner = ucol.find_one({'username': w['bidders'][0]})
        print(winner)
        if winner['funds']<f:
            while winner['funds']<f:
                col.update_one({'_id': ObjectId(data['id'])},{'$pop':{'bidders':1}})
                w = col.find_one({'_id': ObjectId(data['id'])},{'bidders':{'$slice':-1}})
                winner = ucol.find_one({'username': w['bidders'][0]})
        else:
            col.delete_one({'_id': ObjectId(data['id'])})
            z = ucol.find_one({'username': data['username']})
            zwin = ucol.find_one({'username': data['username']})
            zwin2 = zwin['funds']
            z2 = z['funds']
            ucol.update_one({'username': data['username']}, {'$set':{'funds': z2+f}})
            ucol.update_many({}, {'$pull': {'bids': data['id']}})
            ucol.update_one({'username':winner},{'$set':{'funds':zwin2-f}})
            return {
                'message': 'property successfully sold'
            }
