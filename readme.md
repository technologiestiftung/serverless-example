# How to setup a serverless rest api and connect it it with a mongodb on ec2 instance.

## 1. Setup an EC2 instance with terraform
Clone the [Terraform exmaple repo](https://github.com/technologiestiftung/terraform-example-setup) and follow the explained steps to get it running.

Be sure to open all necessary ports in your security groups used by the instance to make it available to the public.


## 1. Setup serverless on an aws with node.js
Follow the [Tutorial](https://hackernoon.com/a-crash-course-on-serverless-with-node-js-632b37d58b44) to config serverless on your machine.


## 2. Install Mongodb on your EC2 instance
Follow this [Tutorial](https://hackernoon.com/how-to-install-and-secure-mongodb-in-amazon-ec2-in-minutes-90184283b0a1) to get the db on your instance runnning.

- Pay attention to the right ```'``` when copying the commands, otherwise you might get errors during your workthrough

Fix the permissions of the mongodb before starting it as a service with the following code:

```
# default path /data/db
cd /path/to/your/db
sudo chown -R mongodb:mongodb *
```

Before starting the db as a service edit the ```mongo.conf``` and update dbPath, and network interfaces

```
# mongod.conf

# Where and how to store data.
storage:
  dbPath: /data/db

# network interfaces
net:
  port: 27017
  bindIpAll: true

security:
  authorization: enabled  
```

Now you should be able to login to your db and fill it with data.

## 3. Create a Restful API to you mongoBD with serverless 

Check out the following [Tutorial](https://hackernoon.com/building-a-serverless-rest-api-with-node-js-and-mongodb-2e0ed0638f47) and find out how to get serverless provinding an API for you database. Furthermore test your routes offline with serverless offline.

Some important code snippets of the tutorial are broken and you have to look here for the snippets: [Tutorial](https://www.programmableweb.com/news/how-to-build-serverless-rest-api-nodejs-and-mongodb/how-to/2018/07/15).


With this information you should be able to make your database accessible via a restful API. Good luck..


