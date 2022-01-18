FROM node:17-slim
ENV TZ=UTC

# home directory
WORKDIR /home/app

# copy app
COPY . .

EXPOSE 5001

# start
CMD ["npm", "start"]