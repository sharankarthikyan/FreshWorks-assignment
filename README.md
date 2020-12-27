# assignment-round1

I have done this assignment using Node JS.

## Configuration Steps

### Step 1:
After downloading, Make sure you are in the folder that contains app.js

### Step 2:
Run the below line.<br>
<code>npm install</code>

### Step 3:
Now, node_modules folder created in the folder that contains app.js. 

## CRD Procedures

### Create:
Run the below line with your mail ID (this is our <b>key</b>) and data. <br>
<code>node app.js create --mail="your mail ID" --data="your data"</code><br>
After running this, See the <b>database.json</b> file. That file is in the same folder that contains app.js and you will notice the data is created.

### Read:
Run the below line with your mail ID. <br>
<code>node app.js read --mail="your mail ID"</code><br>
After running this, you will get a JSON response or an error based on your key.

### Delete:
Run the below line with your mail ID.<br>
<code>node app.js delete --mail="your mail ID"</code><br>
After running this, you will get success message or an error message.
