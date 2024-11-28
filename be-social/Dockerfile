FROM node:alpine
#RUN mkdir -p /usr/src/app
WORKDIR /opt
COPY . .
RUN npm install --silent && npm install -g nodemon 
EXPOSE 5000
CMD ["node", "server"]
