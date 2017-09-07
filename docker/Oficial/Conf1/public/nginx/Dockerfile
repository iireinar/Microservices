FROM centos

RUN yum -y update
RUN yum -y install epel-release
RUN yum -y install nginx
RUN yum clean all

RUN mkdir /nginx
RUN chmod 0755 /nginx
RUN chown nginx:nginx /nginx

RUN rm /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /var/log/nginx

RUN ln -sf /nginx/nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /nginx/conf.d /etc/nginx/conf.d
RUN ln -sf /nginx/logs /var/log/nginx
RUN ln -sf /nginx/www /var/www

COPY start.sh /start.sh
RUN chmod +x start.sh

VOLUME ["/nginx"]
EXPOSE 80
CMD ["/start.sh"]
