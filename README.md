# 基于 React Native 的掌上智慧校园 android 的设计与实现

## 介绍

- 项目即时基于 React Native 构建
- 设计体系参考了 Ant Design、QQ、掌上智慧校园（江工）等
-

## 开发流程

- 更具功能创建功能分支，比如：feat/campus-news
- 接口联调、测试、验收，将分支合并 dev 分支
- 验收通过后，功能分支合并到 master 分支，并且发布版本号

## 目录结构

```
  ├── __tests__                   # App测试
  ├── android                     # android 安卓端依赖
  ├── ios                         # ios 安卓端依赖
  ├── node_modules                # 项目依赖
  ├── src
      └── asyncStorage                         # 数据持久化本地存储
      └── components                           # 业务通用组件
      └── config                               # 配置
      └── screen                               # 页面
      └── stackNavigator                       # 页面导航配置
      └── store                                # redux 全局状态管理
      └── utils                                # 公共方法
      └── index.js                             # 项目入口文件
      └── App.tsx                              # 根页面
      └── tabbar.tsx                           # tabbar页面
      └── CHANGELOG.md                         # 项目版本依赖
      └── .prettierrc.js                       # prettier配置
      └── .eslintrc.js                         # eslintr配置
      └── commitlint.config.js                 # git提交规范配置
      └── .editorconfig                        # editor配置
      └── babel.config.js                      # 代码打包配置
```

## git 提交规范

https://github.com/conventional-changelog/commitlint

- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置，脚本文件等更新
- chore 非 src 或者 测试文件的更新
- revert commit 回退

## 版本发布规范

基于[standard-version](https://github.com/conventional-changelog/standard-version)进行版本管理和 changelog 管理，执行以下命令可以依据 package.json 里的 version 进行 tag 版本生成和 push。

```bash
# 默认发布minor版本，如v1.0.0 -> v1.1.0
npm run release

# 发布major版本，如v1.0.0 -> v2.0.0
npm run release:major

#发布patch版本，如v1.1.0 -> v1.1.1
npm run release:patch
```

版本格式说明：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号(major)：当你做了不兼容的 API 修改，
- 次版本号(minor)：当你做了向下兼容的功能性新增，可以理解为 Feature 版本，
- 修订号(patch)：当你做了向下兼容的问题修正，可以理解为 Bug fix 版本。

测试环境无需创建 tag 版本，可自行选择相应分支进行发布，默认是 dev 分支
