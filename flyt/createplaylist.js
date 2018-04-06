'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.create=(event,context,callback) => {
	const data = JSON.parse(event.body);

	const params = {
		TableName: 'playlist',
		Item: {
			id: uuid.v1(),
			name:data.name
		}
	}
	dynamo.put(params, (error,result) =>{
		if(error)
		{
			console.error(error);
			callback(new Error('Create didnt work'));
			return;
		}
		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null,response)
	})

}