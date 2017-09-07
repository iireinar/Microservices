rm -rf /Docker/volumes/bind9
mkdir -p /Docker/volumes/bind9/
chcon -Rt svirt_sandbox_file_t /Docker/volumes/bind9/

docker run --detach --name bind9 --publish 53:53/udp --net=host
           --volume /Docker/volumes/bind9:/named \
           bind9
