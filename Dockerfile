FROM rust:1.65-alpine3.16 as build

WORKDIR /build
COPY . .
RUN cargo fetch
RUN apk add --no-cache build-base nodejs yarn pkgconfig openssl-dev ca-certificates
RUN rustup target add x86_64-unknown-linux-gnu
RUN RUSTFLAGS='-C target-feature=+crt-static' cargo build --release --target x86_64-unknown-linux-gnu --bin together-green

FROM scratch
WORKDIR /data
ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000
COPY --from=build \
    /etc/ssl/certs/ca-certificates.crt \
    /etc/ssl/certs/ca-certificates.crt
COPY --from=build /build/target/x86_64-unknown-linux-gnu/release /together-green
EXPOSE 8000
VOLUME [ "/data" ]
ENTRYPOINT ["/together-green"]