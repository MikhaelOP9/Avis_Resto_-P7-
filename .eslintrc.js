module.exports = {
    env: {
        "browser": true,
        // "es6": true,
        // "node": true
    },
    extends:[
        "plugin:vue/recommended",
        "airbnb-base",
    ],
    rules:{

    },
    parserOptions:{
        parser:"babel-eslint"
    },"settings": {
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
          }
        }
      },
}