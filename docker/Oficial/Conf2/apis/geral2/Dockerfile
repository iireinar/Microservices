FROM java8

RUN mkdir /usr/app
WORKDIR /usr/app

COPY api-geral-noface-1.0.0.0.jar /usr/app 
COPY start.sh /usr/app

EXPOSE 7002

CMD [ "/usr/app/start.sh" ]
