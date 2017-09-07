FROM centos

RUN yum -y install bind-utils bind && \
    yum clean all

ADD container-image-root /

RUN rndc-confgen -r /dev/urandom  -a -c /etc/rndc.key && \
    chown named:named /etc/rndc.key && \
    chmod 755 /entrypoint

EXPOSE 53/udp 53/tcp

VOLUME [ "/named" ]

ENTRYPOINT [ "/entrypoint"]
CMD [ "/usr/sbin/named" ]
