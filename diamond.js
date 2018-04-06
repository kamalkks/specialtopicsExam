'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.addMusic = (event) => {

  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const date = record.eventTime;
    const uploadDate = new Date(date).toString();

        const pearls = {
		TableName: 'emlyn2',
		Item: {
			id: uuid.v1(),
			name:filename,
			activity:'Music file added',
			date:uploadDate
		
		}
	}
		dynamo.put(pearls, (error,result) =>{
		if(error)
		{
			console.error(error);
			return;
		}
	
	})
  });

};
module.exports.delMusic= (event) => {

  event.Records.forEach((record) => {
    const filename = record.s3.object.key;
    const date2 = record.eventTime;
    const deleteTime = new Date(date2).toString();

        const pearls = {
		TableName: 'emlyn2',
		Item: {
			id: uuid.v1(),
			name:filename,
			activity:'Music file deleted',
			date:deleteTime
		
		}
	}
		dynamo.put(pearls, (error,result) =>{
		if(error)
		{
			console.error(error);
			return;
		}

	
	})
  });

};
