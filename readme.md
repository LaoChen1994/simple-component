# 工程化代码规范配置

## 1. editorconfig

作用：保持不同编辑器之间能过够保持相同的代码风格

配置方法：

1. 在根目录下创建相应的`.editorconfig`文件

2. 按照官网配置如下配置，可以进入[EditorConfig官网](http://editorconfig.org)进行查看对应的参数的意思

具体配置

```toml
# http://editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 80
trim_trailing_whitespace = true

[*.md]
max_line_length = 0
```

## 2. Eslint + prettier配置

作用：通过Eslint来规范代码检测出代码的潜在问题，通过prettier来对代码进行格式化

### 2.1 直接安装

#### 2.2.1 安装和初始化Eslint

```javascript
yarn add eslint -D 
```

使用`eslint --init`来初始化项目的lint规则

```bash
npx eslint --init
```

#### 2.2.2 安装prettier

```bash
yarn add prettier -D
# 用于防止eslint和prettier报错
yarn add eslint-plugin-prettier eslint-config-prettier -D
```

#### 2.2.3 配置eslint和prettier

修改eslint初始化的配置，并加入prettier配置

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    // 这里是用来解决eslint和prettier之间的冲突的
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error"
  }
}
```

```javascript
// prettierrc.js
module.exports = {
   "printWidth": 80,
   "tabWidth": 2,
   "useTabs": false,
   "singleQuote": false,
   "semi": true,
   "trailingComma": "none",
   "bracketSpacing": true,
   "parser": "babel",
   "endOfLine": "auto"
}
```

### 2.2 使用umijs方案

@umijs/fabric中已经包含了相关的配置方案，因此直接使用即可

#### 2.2.1 安装依赖

```bash
yarn add @umijs/fabric --dev
yarn add prettier --dev
```

#### 2.2.2 配置方法

1. 创建.eslintrc.js和.prettierrc.js

2. 引入对应的配置即可，具体配置方法如下：
   
   ```javascript
   // eslintrc.js
   module.exports = {
       extends: [require.resolve('@umijs/fabric/dist/eslint')]
   }
   ```
   
   ```javascript
   // prettier.js
   const fabric = require("@umijs/fabric")
   
   module.exports = {
      ...fabric.prettier
   }
   ```



## 3. Stylelint配置

### 3.1 安装依赖

```bash
yarn add stylelint stylelint-config-standard stylelint-config-rational-order stylelint-prettier stylelint-config-prettier -D

# 支持scss
yarn add postcss-scss
```

### 3.2 配置stylelint

```javascript
module.exports = {
    extends: [
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-prettier/recommend",
    ],
    overrides: [{
        "files": ["**/*.scss"],
        "customSyntax": "postcss-scss"
    }]
}
```

## 4. husky配置

作用：主要用来做提交前的lint，当然也可以规范相关的commit内容



### 4.1 安装依赖

```bash
# 高版本好像有windows失效的情况，先用低版本
yarn add husky@4.3.8
```



### 4.2 package.json中配置

对package.json进行配置，在`precommit`之前进行类型的检查

```json
{
  // 省略部分内容
  "lint-staged": {
    "components/**/*.tsx?": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "components/**/*.sass": [
      "stylelint --syntax sass --fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
    }
  },
}
```
