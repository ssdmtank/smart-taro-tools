
### 安装外部包
```bash
# 给package所有项目安装
lerna add XX
# 给指定目录
lerna add XX packages/hooks
# 增加内部模块之间的依赖
lerna add XXX --scope XX

# 安装依赖
lerna bootstrap
# 清空依赖
lerna clean
```


### 调试
建议用yalc
```bash
# 全局安装
yarn global add yalc
# 在工具包执行
cd /packages/hooks
yalc push --changed --pure
# 在使用包目录
yalc add 包名
# 移出包
yalc remove -all 
```