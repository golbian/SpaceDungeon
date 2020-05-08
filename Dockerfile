FROM node:current-alpine

# setup the user info
ENV USER=spacedungeon
ENV UID=12345
ENV GID=12345

# Create app directory
WORKDIR /usr/src/SpaceDungeon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install dependencies
RUN apk --no-cache add --virtual builds-deps build-base python

# install node packages
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# add new group
RUN addgroup -S "$USER" --gid "$GID"

# add new user
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "$(pwd)" \
    --ingroup "$USER" \
    --no-create-home \
    --uid "$UID" \
    "$USER"

# run the next commands as the specified user
USER $USER

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]
