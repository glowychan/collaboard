## Mongo DB installation

* brew update
* brew install mongodb
* mkdir -p /data/db
* sudo chown -R &#96;id -un&#96; /data/db
* Enter your password on prompt

## To connect to DB
* Run `mongod` on one terminal (always)
* Run `mongo` on another one if you want mongo shell

## Seed Database
* From the project folder go to /server/db/
* Run the following command:
  `mongoimport --db twoodle --collection boards --drop --jsonArray --file seed.json`