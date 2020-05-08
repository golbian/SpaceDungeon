# SpaceDungeon
A turn based rpg in phaser js

# Getting started
The easyest way to run the app is from docker with docker-compose.

## Debian based distribution :
### install git, docker and docker-compose :
```sudo apt-get install -y git docker docker-compose```

### create persistant database directory :
```sudo mkdir /var/mongodb-spacedungeon```

### clone repository :
```git clone https://github.com/golbian/SpaceDungeon.git```

### go to the cloned local repository
```cd SpaceDungeon```

### there is 3 files to edit before building container

- mongo-init.js : initialise the database and user at container start
```db.createUser(
        {
            # define the username of the new database user
            user: "spacedungeon",
            # define the password of the new database user
            pwd: "exemple",
            roles: [
                {
                    role: "readWrite",
                    # define database name (must be the same as defined in .env and docker-compose.yml files)
                    db: "spacedungeon1"
                }
            ]
        }
);```

- .env : contain environement variables used by nodejs
```# should contain mongodb container name
MONGO_CONNECTION_URL= 'mongodb-spacedungeon:27017/'
# name of the database created by mongo-init.js script at container start
DB_NAME= 'spacedungeon'
# username of the database user created by mongo-init.js script at container start
DB_USER= 'TEST'
# password of the database user created by mongo-init.js script at container start
DB_PASSWORD= 'db_password'
# SMTP password of the email sending account
EMAIL_PASSWORD= 'mail_password'
# name of the email provider
EMAIL_PROVIDER= 'mail'
# email address used to send mails
EMAIL= 'your_mail@mail.com'```

- docker-compose.yml : define the docker stack
```# define the root mongodb user
MONGO_INITDB_ROOT_USERNAME: root
# define root password
MONGO_INITDB_ROOT_PASSWORD: example
# define the name of the database to initialise
MONGO_INITDB_DATABASE: spacedungeon1```

## build the container
```docker-compose build spacedungeon```

## run the docker stack
```docker-compose up -d```

## glhf
