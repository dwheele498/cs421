from flask_restful import Resource, reqparse
from flask import request
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS


client = MongoClient()

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
        prop = col.find_one({'_id': ObjectId(data['_id'])})
        newBid = prop['bid'] + data['bid']
        col.update_one({'_id': ObjectId(data['_id'])}, {
                       '$set': {'bid': newBid}})
        ucol.update({'username': data['username']}, {
                    '$addToSet': {'bids': data['_id']}})
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
        col.delete_one({'_id': ObjectId(data['id'])})
        z = ucol.find_one({'username': data['username']})
        z2 = z['funds']
        ucol.update_one({'username': data['username']}, {'funds': z2+f})
        ucol.update_many({}, {'$pull': {'bids': data['id']}})
        return {
            'message': 'property successfully sold'
        }
