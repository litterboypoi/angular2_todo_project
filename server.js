const express=require('express');
const Mock = require('mockjs');
const cookieParser = require('cookie-parser');
const app=express();


app.use(express.static('./app'));
app.use("/dist",express.static('./app/dist'))
app.use(cookieParser());

let invitation = {
	"invitationId|1-50":50,
    "projectId|1-50":50,
	"inviterId|1-50":50,
	"invitedId|1-50":50,
	"inviterName": Mock.mock('@cname'),
	"projectName": Mock.mock('@ctitle'),
	"state|0-2":0,
};

let usershortcut = {
	"id|1-50":50 ,
    "name": Mock.mock('@cname'),
    "faceUrl":Mock.mock('@url')
};

let user = {
	"id|1-50":50 ,
    "name": Mock.mock('@cname'),
    "faceUrl":Mock.mock('@url'),
    "invitedlist|1-5":[
    	{
			"invitationid|1-50":50,
		    "projectid|1-50":50,
			"inviteduser|1-50":50,
			"inviterid|1-50":50,
			"projectname": Mock.mock('@ctitle'),
		}
    ],
    "projectNameList|1-5":[
    	Mock.mock('@ctitle')
    ]

};

let task = {
    "id|1-50":50 ,
    "name": Mock.mock('@ctitle'),
    "detail": Mock.mock('@cparagraph'),
    "finished|0-1":1,
    "finishUserId|1-50":50,
	"finishUserName":Mock.mock('@cname'),
	"important|0-1":1,
	"projectid|1-50":50,
};

let project = {
    "id|1-50":50 ,
    "name": Mock.mock('@ctitle'),
    "detail": Mock.mock('@cparagraph'),
    "userList|1-5":[
		{
		"id|1-50":50 ,
	    "name": Mock.mock('@cname'),
	    "faceUrl":Mock.mock('@url')
		}
    ],
    "taskList|1-5":[
    	{
		    "id|1-50":50 ,
		    "name": Mock.mock('@ctitle'),
		    "detail": Mock.mock('@cparagraph'),
		    "finishUserId|1-50":50,
			"finishUserName":Mock.mock('@cname'),
			"important|0-1":1,
			"projectid|1-50":50,
		}
    ]
};

let data = Mock.mock(user);

app.get('/api/projects',(req,res)=>{
	console.log("have requested");
	res.header("Access-Control-Allow-Origin","*")
	res.jsonp(Mock.mock({
		"data|1-5":[
			{
			    "id|1-50":50 ,
			    "name": Mock.mock('@ctitle'),
			    "detail": Mock.mock('@cparagraph'),
			    "userList|1-5":[
					{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url')
					}
			    ],
			    "taskList|1-5":[
			    	{
					    "id|1-50":50 ,
					    "name": Mock.mock('@ctitle'),
					    "detail": Mock.mock('@cparagraph'),
					    "finishUserId|1-50":50,
						"finishUserName":Mock.mock('@cname'),
						"important|0-1":1,
						"projectid|1-50":50,
					}
			    ]
			}
		]
	}));
});

app.get('/api/projects/:id',(req,res)=>{
	const id = req.params.id;
	res.jsonp(Mock.mock({
		"data":{
			    "id":id ,
			    "name": Mock.mock('@ctitle'),
			    "detail": Mock.mock('@cparagraph'),
			    "userList|1-5":[
					{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url')
					}
			    ],
			    "taskList|1-5":[
			    	{
					    "id|1-50":50 ,
					    "name": Mock.mock('@ctitle'),
					    "detail": Mock.mock('@cparagraph'),
					    "finishUserId|1-50":50,
						"finishUserName":Mock.mock('@cname'),
						"important|0-1":1,
						"projectid":id,
					}
			    ]
			}
	}));
});

app.post('/api/projects',(req,res)=>{
	const id = Math.round(Math.random()*50);
	res.jsonp(Mock.mock({
		"data":{
			    "id":id ,
			    "name": Mock.mock('@ctitle'),
			    "detail": Mock.mock('@cparagraph'),
			    "userList|1-5":[
					{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url')
					}
			    ],
			    "taskList|1-5":[
			    	{
					    "id|1-50":50 ,
					    "name": Mock.mock('@ctitle'),
					    "detail": Mock.mock('@cparagraph'),
					    "finishUserId|1-50":50,
						"finishUserName":Mock.mock('@cname'),
						"important|0-1":1,
						"projectid":id,
					}
			    ]
			}
	}));
});

app.put('/api/projects/:id',(req,res)=>{
	const id = Math.round(Math.random()*50);
	res.jsonp(Mock.mock({
		"data":{
			    "id":id ,
			    "name": Mock.mock('@ctitle'),
			    "detail": Mock.mock('@cparagraph'),
			    "userList|1-5":[
					{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url')
					}
			    ],
			    "taskList|1-5":[
			    	{
					    "id|1-50":50 ,
					    "name": Mock.mock('@ctitle'),
					    "detail": Mock.mock('@cparagraph'),
					    "finishUserId|1-50":50,
						"finishUserName":Mock.mock('@cname'),
						"important|0-1":1,
						"projectid":id,
					}
			    ]
			}
	}));
});

app.delete('/api/projects/:id',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":"success"
	}));
});

app.get('/api/tasks/:id',(req,res)=>{
	const id = req.params.id;
		res.jsonp(Mock.mock({
		"data":{
				    "id":id ,
				    "name": Mock.mock('@ctitle'),
				    "detail": Mock.mock('@cparagraph'),
   					"finished|0-1":1,
				    "finishUserId|1-50":50,
					"finishUserName":Mock.mock('@cname'),
					"important|0-1":1,
					"projectid|1-50":50,
				}
	}));
});

app.post('/api/tasks',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":{
				    "id|1-50":50 ,
				    "name": Mock.mock('@ctitle'),
				    "detail": Mock.mock('@cparagraph'),
    				"finished|0-1":1,
				    "finishUserId|1-50":50,
					"finishUserName":Mock.mock('@cname'),
					"important|0-1":1,
					"projectid|1-50":50,
				}
	}));
});

app.put('/api/tasks/:id',(req,res)=>{
	const id = req.params.id;
	res.jsonp(Mock.mock({
		"data":{
				    "id": id,
				    "name": Mock.mock('@ctitle'),
				    "detail": Mock.mock('@cparagraph'),
    				"finished|0-1":1,
				    "finishUserId|1-50":50,
					"finishUserName":Mock.mock('@cname'),
					"important|0-1":1,
					"projectid|1-50":50,
				}
	}));
});

app.delete('/api/tasks/:id',(req,res)=>{
	res.end('success')
});

app.get('/api/myinfo',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url'),
				    "invitationList|1-5":[
				    	invitation
				    ],
				    "projectList|1-5":[
				    	{"name":Mock.mock('@ctitle'),
				    	 "id|1-50":50
				    	}
				    ]

				}
	}));
});

app.get('/api/user/:id',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":{
					"id|1-50":50 ,
				    "name": Mock.mock('@cname'),
				    "faceUrl":Mock.mock('@url')
				}
	}));
});

app.post('/api/invitation',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":"success"
	}));
});

app.put('/api/invitation/:id',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":invitation
	}));
});

app.post('/api/relationship',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":"success"
	}));
});

app.post('/api/user',(req,res)=>{
	res.jsonp(Mock.mock({
		"data":"success"
	}));
});

app.post('/api/login',(req,res)=>{

	res.cookie('id',1);
	res.jsonp({data:"success"});

});

app.get('/getcookie',(req,res)=>{
	let id = req.cookies.id;
	console.log(id);
	res.end(id);
	

});


app.get('/clearcookie',(req,res)=>{
	res.clearCookie("id");
	res.end("sdljf");
});

const server=app.listen(8088,'127.0.0.1',()=>{
	const host=server.address().address;
	const port=server.address().port;
	
	console.log(`访问地址为http://${host}:${port}`);
	
});