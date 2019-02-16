FROM node:10.15-alpine

# CREATE ARGs
ARG nameImage="address"
ARG port=5002

# install deps
RUN mkdir /tmp/$nameImage
ADD package.json /tmp/$nameImage/package.json
RUN cd /tmp/$nameImage && npm install

# Copy deps
RUN mkdir -p /opt/hedz/ms-$nameImage && cp -a /tmp/$nameImage/node_modules /opt/hedz/ms-$nameImage

# Setup workdir
WORKDIR /opt/hedz/ms-$nameImage
COPY . /opt/hedz/ms-$nameImage

# run
EXPOSE $port
CMD ["npm", "start"]