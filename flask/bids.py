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


class UserBids(Resource):
    userparse = reqparse.RequestParser()
    userparse.add_argument('username',
                           type=str,
                           required=True,
                           help="This field cannot be left blank",
                           location='args'
                           )

    #caught by cors for some reason, do not use
    def get(self,methods=['GET']):
        data = UserBids.userparse.parse_args()
        user = ucol.find_one({'username': data['username']})
        propids = []
        userprops = []
        user = ucol.find_one({'username': data['username']})
        print(user['username'])
        for b in user['bids']:
            propids.append(b)
        print(propids)
        for p in propids:
            z = col.find_one({'_id': ObjectId(p)})
            userprops.append({
                'id': str(z['_id']),
                'name': z['name'],
                'price': z['price'],
                'owner': z['owner'],
                'bid': z['bid'],
                'description': z['description'],
                'imgsrc': z['imgsrc']
            })

        return {'message': 'successfully retrieved properties', 'properties': userprops}, 200
