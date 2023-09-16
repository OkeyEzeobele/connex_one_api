# Connex One API

This is a simple Express.js API to fetch the current epoch time. It also includes a middleware for Prometheus monitoring and CORS support. Unit tests are written using Jest and SuperTest.

## Table of Contents
1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Testing](#testing)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

## Features
- Fetch current epoch time
- CORS enabled
- Prometheus metrics enabled
- Unit tests using Jest and SuperTest

## Requirements
- Node.js >= 14.x
- npm >= 6.x

## Installation
Clone this repository and install dependencies:
```bash
git clone https://github.com/OkeyEzeobele/connex_one_api.git
cd connex_one_api
npm install
```

## Usage
To start the application:

```bash
npm start
```
This will start the application on port 5000 by default. Visit `http://localhost:5000/` in your browser.

For production environments, it is recommended to use a process manager like [PM2](https://pm2.keymetrics.io/):
```bash
pm2 start index.js
```

## Testing
Run the test suite using Jest:
```bash
npm test
```

## API Endpoints

Here's an updated description of the API endpoints, including the new `/metrics` endpoint and specification details.

| Method | Endpoint | Description                             | Required Headers |
|--------|----------|-----------------------------------------|------------------|
| GET    | `/time`  | Get the current epoch time              | Authorization    |
| GET    | `/metrics`| Serve Prometheus-format metrics        | Authorization    |

### Fetch Current Epoch Time

**Endpoint**: `/time`

#### Specification
Responses returned from the API should validate against the following JSON schema:
```json
{
  "properties": {
    "epoch": {
      "description": "The current server time, in epoch seconds, at time of processing the request.",
      "type": "number"
    }
  },
  "required": ["epoch"],
  "type": "object"
}
```

#### Request
```bash
GET /time
```
**Headers**:
- Authorization: `mysecrettoken`

#### Response
**Status**: `200 OK`

**Body**:
```json
{
  "epoch": 1631827273
}
```

### Fetch Prometheus Metrics

**Endpoint**: `/metrics`

#### Specification
The response should serve all available Prometheus-format metrics for the API, including default recommended metrics (`collectDefaultMetrics`).

#### Request
```bash
GET /metrics
```
**Headers**: None

#### Response
**Status**: `200 OK`

**Body**:
```
# HELP http_requests_total The total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="get",code="200"} 74
http_requests_total{method="get",code="404"} 3

# ... other Prometheus metrics
```

The `/metrics` endpoint will return metrics in a text-based format that is compatible with Prometheus data collection.

## Contributing
Please fork this repository and create a pull request for any features, patches, or bugfixes you have.

1. Fork the repository
2. Clone your forked repository
3. Create a new branch (`git checkout -b new-feature`)
4. Commit changes to the new branch
5. Push to the branch (`git push origin new-feature`)
6. Create a Pull Request

---

**Note**: Authorization mechanism and token management are simplified for demonstration purposes. Please implement a robust authentication and authorization system for production use.

For questions or feedback, please open an issue or contact the repository owner.
