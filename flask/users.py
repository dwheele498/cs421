import sqlite3
from flask_restful import Resource, reqparse



class User:
    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, un):
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        select = "SELECT * FROM users WHERE username=?"
        result = cursor.execute(select,(un,))
        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None
        connection.close()
        return user
    @classmethod
    def pass_check(cls,un, pw):
        user = User.find_by_username(un)
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
        if User.find_by_username(data['username']):
            return {'message':'user already exists'},400

        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        
        cursor.execute("INSERT INTO users VALUES (NULL,?,?)",(data['username'],data['password']))
        connection.commit()
        connection.close()

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
        if User.pass_check(data['username'], data['password']):
            return {'message': 'user successfully logged in'},200
        return {'message':'username of password incorrect'},400

