rm -rf /Docker/volumes/nginx
mkdir -p /Docker/volumes/nginx
chcon -Rt svirt_sandbox_file_t /Docker/volumes/nginx

mkdir /Docker/volumes/nginx/logs
mkdir /Docker/volumes/nginx/conf.d
mkdir /Docker/volumes/nginx/www

cp conf/nginx.conf /Docker/volumes/nginx/
cp conf/proxy.conf /Docker/volumes/nginx/conf.d/

docker run --detach --name nginx --publish 80:80 --net=host --privileged=true \
           --volume /Docker/volumes/nginx:/nginx \
           nginx
