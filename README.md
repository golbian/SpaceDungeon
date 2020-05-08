# SpaceDungeon
A turn based rpg in phaser js

# Getting started
The easyest way to run the app is from docker with docker-compose.

## Debian based distribution
> the procedure bellow describe how to setup a testing environement, you shouldn't run this app in production at this stage of developpement

### install git, docker and docker-compose
```sudo apt-get install -y git docker docker-compose```

### add your user to the docker group to be able to use docker
```sudo usermod -aG docker <username>```
> you should restart your user shell to be assign to the group

### enable the docker service at boot and start it now
```sudo systemctl enable --now docker.service```

### create persistant database directory
```sudo mkdir /var/mongodb-spacedungeon```

### browse to your home directory
```cd```

### clone the repository
```git clone https://github.com/golbian/SpaceDungeon.git```

### browse to the local repository folder
```cd SpaceDungeon```

### there is 3 files you must edit before building container

- mongo-init.js : initialise the database and user at container start
```
db.createUser(
        {
            // define the username of the new database user (must be the same as defined in .env file)
            user: "db_username",
            // define the password of the new database user (must be the same as defined in .env file)
            pwd: "db_password",
            roles: [
                {
                    role: "readWrite",
                    // define database name (must be the same as defined in .env and docker-compose.yml files)
                    db: "spacedungeon1"
                }
            ]
        }
);
```

- .env : contain environement variables used by nodejs
```
# should contain mongodb container name
MONGO_CONNECTION_URL= 'mongodb-spacedungeon:27017'
# name of the database created by mongo-init.js script at container start
DB_NAME= 'spacedungeon1'
# username of the database user created by mongo-init.js script at container start
DB_USER= 'db_username'
# password of the database user created by mongo-init.js script at container start
DB_PASSWORD= 'db_password'
# SMTP password of the email sending account
EMAIL_PASSWORD= 'mail_password'
# name of the email provider
EMAIL_PROVIDER= 'email_provider'
# email address used to send mails
EMAIL= 'your_mail@mail.com'
```
- docker-compose.yml : define the docker stack
```
# define the root mongodb user
MONGO_INITDB_ROOT_USERNAME: root
# define root password
MONGO_INITDB_ROOT_PASSWORD: example
# define the name of the database to initialise
MONGO_INITDB_DATABASE: spacedungeon1
```
## build the container
```docker-compose build spacedungeon```

## run the docker stack
```docker-compose up -d```

## check if containers are started successfully
```docker ps```
```
CONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS                    NAMES
973798dade15        spacedungeon_spacedungeon   "docker-entrypoint.s…"   1 minutes ago       Up 1 minutes       0.0.0.0:8080->8080/tcp   spacedungeon
b39c99a21c84        mongo:latest                "docker-entrypoint.s…"   1 minutes ago        Up 1 minutes       27017/tcp                mongodb-spacedungeon
```

## you can check the spacedungeon container output to see if the database connection is working
```docker logs spacedungeon```
```
Server started on port 8080
connected to mongo
```

## access the interface
> now you can access the web interface and singup a new user account on http://127.0.0.1:8080

# glhf
