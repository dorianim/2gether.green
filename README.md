<h1 align="center">
    2gether.green (hackaTUM 2022)
</h1>

<p align="center">
  <a href="https://github.com/dorianim/2gether.green/actions/workflows/preview.yml">
    <img src="https://github.com/dorianim/2gether.green/actions/workflows/preview.yml/badge.svg">
  </a>
  <a href="https://rust-reportcard.xuri.me/badge/github.com/dorianim/2gether.green">
    <img src="https://rust-reportcard.xuri.me/badge/github.com/dorianim/2gether.green">
  </a>
  <a href="https://www.gnu.org/licenses/agpl-3.0" ><img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg" /></a>
</p>

#### [Read the devpost here!](https://devpost.com/software/2gethergreen)

We can only become green together! It's our mission to simplify this process by providing a platform for communities to invest into local renewable energy source projects. 

![image](https://user-images.githubusercontent.com/30153207/202896189-4e9064a5-2c3f-4509-b154-e4ccaea96b1d.png)

# Usage

Using `docker-compose`:

```yaml
version: "3"
services:
  money-balancer:
    image: ghcr.io/dorianim/2gether.green
    restart: unless-stopped
    ports:
      - 8000:8000
    volumes:
      - ./data:/data
```

Using `docker`:

```bash
docker run -p8000:8000 -v $(pwd)/data:/data ghcr.io/dorianim/2gether.green
```

You can then access 2gether.green on [`http://localhost:8000`](http://localhost:8000).

# Development

You need `cargo` and `yarn` installed on your system. You can build everything using

```
cargo build --release
```

This will create a static binary in `./target/release/together-green` which you can run.
