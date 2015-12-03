ech
===
Echo Entire HTTP Requests in JSON.

So the top few Google searches for something to the effect of "http echo server"
didn't return much. Or maybe I didn't look hard enough, whatever.

Anyway, I rolled my own. This is not HTTPBin, rather this echoes all parts of
any and all requests made to the server (I could think of) including:

- URL
- HTTP Method
- Headers
- Querystring
- Request IP
- HTTP Body

The idea is to make literally any request, and get your response back verbatim
(in JSON!).

Usage
-----

	Usage: ech [options]

	Options:

		-h, --help     output usage information
		-V, --version  output the version number
		-p, --port     Specify port [default:8001]
		-h, --host     Specify host [default:'0.0.0.0']

Install
-------

	npm install -g ech

Examples
--------
### Example 1

```bash
$ curl 'http://user:pass@localhost:8001/p/a/t/h?query=string#hash' \
	-u sk_test_PJHhXK0ewzsJUfzjDQvEBCLN: \
	-d amount=400 \
	-d currency=usd \
	-d "description=Charge for test@example.com" \
	-d "source[object]=card" \
	-d "source[number]=4242424242424242" \
	-d "source[exp_month]=12" \
	-d "source[exp_year]=2016" \
	-d "source[cvc]=123"
```

(Yes, that's from from Stripe's examples)

Result:
```json
{
		"fullUrl": "/p/a/t/h?query=string",
		"url": "/p/a/t/h",
		"fullQuery": "?query=string",
		"query": {
				"query": "string"
		},
		"ip": "127.0.0.1",
		"method": "POST",
		"headers": {
				"authorization": "Basic c2tfdGVzdF9QSkhoWEswZXd6c0pVZnpqRFF2RUJDTE46cGFzcw==",
				"user-agent": "curl/7.35.0",
				"host": "localhost:8001",
				"accept": "*/*",
				"content-length": "174",
				"content-type": "application/x-www-form-urlencoded"
		},
		"body": {
				"amount": "400",
				"currency": "usd",
				"description": "Charge for test@example.com",
				"source[object]": "card",
				"source[number]": "4242424242424242",
				"source[exp_month]": "12",
				"source[exp_year]": "2016",
				"source[cvc]": "123"
		}
```

### Example 2
```bash
$ curl localhost:8001
```

Result:
```json
{
		"fullUrl": "/",
		"url": "/",
		"fullQuery": "",
		"query": {},
		"ip": "127.0.0.1",
		"method": "GET",
		"headers": {
				"user-agent": "curl/7.35.0",
				"host": "localhost:8001",
				"accept": "*/*"
		},
		"body": {}
}
```
- - -
You get the idea.
