FROM alpine:latest
RUN apk update
RUN apk add openssh wget --no-cache
RUN apk add nmap nmap-scripts nmap-ncat nmap-nping nmap-nselibs perl-net-telnet --no-cache
RUN ssh-keygen -t rsa -b 1024 -f /etc/ssh/ssh_host_rsa_key
RUN ssh-keygen -t dsa -b 1024 -f /etc/ssh/ssh_host_dsa_key
RUN ssh-keygen -t ecdsa -b 521 -f /etc/ssh/ssh_host_ecdsa_key
RUN adduser ranieri -D
RUN echo ranieri:test | chpasswd
COPY sshd_config /etc/ssh/sshd_config
COPY start_ssh.sh /start_ssh.sh
