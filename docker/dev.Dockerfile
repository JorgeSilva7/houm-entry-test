FROM node:17-slim
ENV TZ=UTC

# home directory
WORKDIR /home/app

# node packages
COPY package.json ./
RUN npm install 

# copy app
COPY . .