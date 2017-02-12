FROM node:6.9.4-alpine

RUN apk --no-cache add ca-certificates curl make gcc g++ python linux-headers paxctl libgcc libstdc++ gnupg git wget && update-ca-certificates

RUN mkdir -p /opt/yarn && cd /opt/yarn && wget https://yarnpkg.com/latest.tar.gz && tar zxf latest.tar.gz
ENV PATH "$PATH:/opt/yarn/dist/bin"

EXPOSE 3000
CMD ["node", "src/index.js"]

WORKDIR /opt/app

ADD package.json yarn.lock /cache/

ADD .yarn-cache.tgz /

RUN cd /cache \
  && yarn config set cache-folder /usr/local/share/.cache/yarn \
  && yarn \
  && cd /opt/app && ln -s /cache/node_modules node_modules \
  && tar czf /.yarn-cache.tgz /usr/local/share/.cache/yarn

COPY . /opt/app
