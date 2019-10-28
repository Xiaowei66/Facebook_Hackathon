from googletrans import Translator
from flask import Flask, abort, request
from flask_restplus import Resource, Api, reqparse, fields
from flask_sqlalchemy import SQLAlchemy

import os, requests, uuid, json
import threading, time

app = Flask(__name__)
api = Api(app, title='API', description='peer note API', default="Actions",  default_label=None)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///' + os.path.join(basedir, 'database/database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable = False)
    transType = db.Column(db.Integer, nullable = False)
    upvotes = db.Column(db.Integer, nullable=False)
    downvotes = db.Column(db.Integer, nullable=False)
    trans = db.Column(db.String(255), nullable=False)

headers  = {
    'Ocp-Apim-Subscription-Key': 'a344f69c533c424aa253865eec14f3fe', 
    'Content-type': 'application/json', 
    'X-ClientTraceId': ''
}

micUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en'


lookup = { 
    'google':1,
    'microsoft':2,
    'both':3,
    'user':4,
    'default':5,
}

# def getDefaultTrans(text, results):
#     # microsoft for now 
#     body = [{ 'text' : text }]
#     request= requests.post(micUrl, headers=headers, json=body)
#     response = request.json()
#     return response[0]["translations"][0]['text']

def getGoogleTrans(text,results):
    translator = Translator()
    transObj = translator.translate(text)
    results[0] = transObj.text
    return transObj.text

def getMicrosoftTrans(text,results):
    body = [{ 'text' : text }]
    request= requests.post(micUrl, headers=headers, json=body)
    response = request.json()
    results[1] = response[0]["translations"][0]['text']
    return response[0]["translations"][0]['text']

def getTrans(text):
    threads = []
    results = [None]*2
    t1 = threading.Thread(target=getMicrosoftTrans, args=(text,results))
    t2 = threading.Thread(target=getGoogleTrans, args=(text,results))
    t1.start() 
    t2.start() 
    t1.join() 
    t2.join() 
    return results

@api.route('/vote')
class First(Resource):
    @api.doc(body=api.model("vote", {
        "id":fields.Integer(description="the rating identifier",required=True), 
        "updown":fields.Boolean(description="downvote:0 upvote:1",required=True),
        "switch":fields.Boolean(description="downvote:0 upvote:1",required=True)}))
    def post(self):
        payload = request.get_json()
        ident = payload["id"]
        if ident == None:
            return 404
        updown = payload["updown"]
        switch = payload["switch"]
        record = Record.query.filter_by(id=ident).first()
        if record == None:
            return 404
        if updown == True:
            record.upvotes = record.upvotes + 1 
            if switch:
                record.downvotes = record.downvotes - 1
        else:
            record.downvotes = record.downvotes + 1
            if switch:
                record.upvotes = record.downvotes - 1
        db.session.commit()
        return 200


@api.route('/getTranslation')
class Second(Resource):
    @api.doc(body=api.model("gettrans", {"text":fields.String(description="translation text",required=True)}))
    def post(self):
        payload = request.get_json()
        text = payload["text"]
        if len(text) > 255:
            return 500
        records = Record.query.filter_by(text=text).order_by(Record.upvotes.desc()).all()
        if not records:
            trans = getTrans(text)
            records = []
            if trans[0] == trans[1]:
                record = Record(text=text, transType=lookup['both'],upvotes=0, downvotes=0, trans=trans[0])
                db.session.add(record)
                records.append(record)
            else:
                record1 = Record(text=text, transType=lookup['google'],upvotes=0, downvotes=0, trans=trans[0])
                db.session.add(record1)
                record2 = Record(text=text, transType=lookup['microsoft'],upvotes=0, downvotes=0, trans=trans[1])
                db.session.add(record2)
                records = [record1, record2]
            db.session.commit()
            return {
            "records":[{
                'id': record.id,
                'text': record.text, 
                'transType': record.transType,
                'upvotes': record.upvotes,
                'downvotes': record.downvotes,
                'trans': record.trans,
            } for record in records]}, 200
        else:
            records = records[:5]
            return {
            "records":[{
                'id': record.id,
                'text': record.text, 
                'transType': record.transType,
                'upvotes': record.upvotes,
                'downvotes': record.downvotes,
                'trans': record.trans,
            } for record in records]},200

@api.route('/addTranslation')
class Third(Resource):
    @api.doc(body=api.model("add", {
        "text":fields.String(description="input text",required=True),
        "trans":fields.String(description="translated text",required=True),}))
    def post(self):
        payload = request.get_json()
        text = payload["text"]
        trans = payload["trans"]
        db.session.add(Record(text=text, transType=lookup['user'],upvotes=0, downvotes=0, trans=trans))
        db.session.commit()
        return 200


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)




# Test information here
