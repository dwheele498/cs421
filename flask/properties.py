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


client = MongoClient()
client2 = MongoClient()
db = client.properties
db2 = client2.paths
col = db.properties
col2 = db2.paths
fs = gridfs.GridFS(db)
uploadDir = 'images/'

Cloud.config(
  cloud_name = 'dtis1mlk2',  
  api_key = '741724242335472',  
  api_secret = 'lF3-bxKsDy25lkDlv02tOQedwX0'  
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
            "bid": 0,
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
                           required=True,
                           help="This field cannot be left blank",
                           location='args'
                           )

    def get(self):
        data = ViewProperty.getparser.parse_args()
        prop = ViewProperty.getEntry(data['owner'], data['name'])
        return {'message': 'succesfully obtained property', 'property': prop}, 200

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
        print(z)
        return {'message': 'successfully stored image','data':z['secure_url']}, 200
        

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
                'imgsrc': properties['imgsrc']
            }
            holder.append(z)
        return {'message':'all properties attached','data':holder},200
