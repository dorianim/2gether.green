FROM rust:1.65-alpine3.16 as build

WORKDIR /build
COPY . .
RUN cargo fetch
RUN apk add --no-cache build-base nodejs yarn pkgconfig openssl-dev ca-certificates
RUN cargo build --release

FROM scratch
WORKDIR /data
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000
COPY --from=build \
    /etc/ssl/certs/ca-certificates.crt \
    /etc/ssl/certs/ca-certificates.crt
COPY --from=build /build/target/release/together-green /together-green
EXPOSE 8000
VOLUME [ "/data" ]
ENTRYPOINT ["/together-green"]