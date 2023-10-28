# Base our image on the official node image.
FROM node:15

# Set our working directory in the container. All commands will be run from here. 
# Also if you copy files to container, it will by default copy here.
WORKDIR /app

# Copy files or folders from source (where this Dockerfile is) to the dest path in the image's filesystem.
# "." means relative to our WORKDIR. "COPY package.json /app" would do the same. 
# To copy the package.json first is an optimization technique that has to do with how Docker builds the image with layers 
# and using layering cache.
COPY package.json .

# Install dependencies in the WORKDIR.
RUN npm install 

# Argument passed in when building the image. In our case we need to pass it in the docker compose file where we build the image. 
ARG NODE_ENV

# NOTE: you need the starting and ending spaces in the bracket. 
# "npm install --only=production;" means no dev dependencies will be installed. 
RUN if [ "$NODE_ENV"="development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy everything from current folder to WORKDIR. 
# "." and "./" is the same thing.
COPY . ./

# Create enviroment variables inside the container.
# PORT will have default value 3000. You can override this default when you deploy the container, in the "docker run" command.   
ENV PORT 3000

# Define the network ports that this container will listen on at runtime.
# (This is for documentation purpose. We tell readers what we expect the app to listen to. We could remove this line and it will
# not affect anything. Need to use the -p flag in the docker run command to open ports.)
EXPOSE $PORT

# When the container is started, the command "node index.js" will run. 
# Default command to run. Docker compose file will override this. 
# E.g. in docker-compose.dev.yml "command: npm run dev".
CMD ["node", "index.js"]