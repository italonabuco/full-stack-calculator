FROM golang:1.26-alpine AS build

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .
RUN go build -o /calculator-api ./cmd/server

FROM alpine:3.22

WORKDIR /app

COPY --from=build /calculator-api /app/calculator-api

ENV PORT=8080
EXPOSE 8080

CMD ["/app/calculator-api"]
