# Cerebro Plugin Shorten Url

## Install

1. cd to your cerebro plugins directory and ```npm install cerebro-shorten-url```
2. Sign yourself up at [Bitly](https://bitly.com/) and generate token at user panel.

3. paste the token to file ```dist/index.js``` at line 74 in ```plugins/node_modules/cerebro-shorten-url/dist/index.js```

```
module.exports = {"bitly_token":"xxxxxxxxxxxxxxxxxxxxxxxxx"}  
```

## Use

Simply Type ```short``` on your cerebro panel
