from flask_restful import Resource, reqparse
from flask import request
from pymongo import MongoClient
from bson.binary import Binary
import gridfs
import werkzeug
from bson.objectid import ObjectId
import os
import cloudinary as Cloud
import cloudinary.uploader
import urllib.parse

username = urllib.parse.quote_plus('user')
password = urllib.parse.quote_plus('Dvine489')


client = MongoClient('mongodb+srv://'+username+':'+password+'@cluster0.19oll.mongodb.net/<properties>?retryWrites=true&w=majority')

db = client.properties
col = db.properties
udb = client.users
ucol = udb.users
fs = gridfs.GridFS(db)
uploadDir = 'images/'

Cloud.config(
    cloud_name='dtis1mlk2',
    api_key='741724242335472',
    api_secret='lF3-bxKsDy25lkDlv02tOQedwX0'
)

if not os.path.exists(uploadDir):
    os.makedirs(uploadDir)


class Property():
    def __init__(self, name, price, owner, imgsrc=None):
        self.name = name
        self.price = price
        self.curentBid = 0
        self.owner = owner
        self.imgsrc = imgsrc

    @classmethod
    def checkProperty(cls, owner, name):
        props = col.find_one({"$and": [{'owner': owner}, {'name': name}]})
        if props:
            p = Property(props['name'], props['price'],
                         props['owner'])
        else:
            p = None
        return p


class NewProperty(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank"
                        )
    parser.add_argument('price',
                        type=int,
                        required=True,
                        help="This field cannot be left blank"
                        )
    parser.add_argument('owner',
                        type=str,
                        required=True,
                        help="This field cannot be left blank"
                        )
    parser.add_argument('description',
                        type=str,
                        required=False,
                        help="This field is optional"
                        )
    parser.add_argument('imgsrc',
                        type=str,
                        required=True,
                        help="This field is optional"
                        )

    def post(self):
        data = NewProperty.parser.parse_args()
        if Property.checkProperty(data['owner'], data['name']):
            return {'message': 'property alread exists', 'details': data, 'success': False}, 400
        property = {
            "name": data['name'],
            "price": data['price'],
            "owner": data['owner'],
            "bid": data['price'],
            "description": data['description'],
            "imgsrc": data['imgsrc']
        }
        col.insert_one(property)
        return {'message': 'successfully added property', 'success': True}, 200


class ViewProperty(Resource):
    getparser = reqparse.RequestParser()
    getparser.add_argument('owner',
                           type=str,
                           required=True,
                           help="This field cannot be left blank",
                           location='args'
                           )
    getparser.add_argument('name',
                           type=str,
                           required=False,
                           help="This field cannot be left blank",
                           location='args'
                           )

    def get(self):
        data = ViewProperty.getparser.parse_args()
        user = ucol.find_one({'username': data['owner']})
        propids = []
        userprops = []
        if user['bids']:
            for b in user['bids']:
                propids.append(b)
            for p in propids:
                z = col.find_one({'_id': ObjectId(p)})
                if z:
                    userprops.append({
                        'id': str(z['_id']),
                        'name': z['name'],
                        'price': z['price'],
                        'owner': z['owner'],
                        'bid': z['bid'],
                        'description': z['description'],
                        'imgsrc': z['imgsrc']
                    })
                else:
                    return {'message':'currently no bids','properties':'no properties'},204
            return {'message': 'successfully retrieved properties', 'properties': userprops}, 200
        else:
            return {'message': 'currently no bids', 'properties' : 'no properties'}, 204

    @classmethod
    def getEntry(cls, owner, name):
        data = col.find_one({"$and": [{'owner': owner}, {'name': name}]})
        if data:
            return data
        else:
            return None


class ImageProperty(Resource):
    imgparser = reqparse.RequestParser()

    def post(self):

        file = request.files['file']
        file.save(os.path.join(uploadDir, file.filename))
        jpg = os.path.join(uploadDir, file.filename)
        z = Cloud.uploader.upload(jpg)
        return {'message': 'successfully stored image', 'data': z['secure_url']}, 200


class AllProperty(Resource):
    def get(self):
        data = col.find()
        holder = []
        for properties in data:
            z = {
                'id': str(properties['_id']),
                'name': properties['name'],
                'price': properties['price'],
                'owner': properties['owner'],
                'bid': properties['bid'],
                'description': properties['description'],
                'imgsrc': properties['imgsrc'],
                'bidders':[]
            }
            holder.append(z)
        return {'message': 'all properties attached', 'data': holder}, 200


# class AddBid(Resource):
#     bidparse = reqparse.RequestParser()
#     bidparse.add_argument('username',
#                           type=str,
#                           required=True,
#                           help="username cannot be left blank"
#                           )
#     bidparse.add_argument('bid',
#                           type=int,
#                           required=True,
#                           help="bid cannot be left blank"
#                           )
#     bidparse.add_argument('_id',
#                           type=str,
#                           required=True,
#                           help="id cannot be left blank"
#                           )

#     def post(self):
#         data = AddBid.bidparse.parse_args()
#         prop = col.find_one({'_id':ObjectId(data['_id'])})
#         newBid = prop['bid'] + data['bid']
#         col.update_one({'_id':ObjectId(data['_id'])},{'$set':{'bid':newBid}})
#         ucol.update({'username':data['username']},{'$push':{'bids':data['_id']}})
#         return {'message':'successfully added bid'},200
