# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性



<!-- 作业：
1、环节：总体上可以分成通过入口递归整个文件的结构，然后使用各种loader和plugin解析文件中的内容，输出到出口文件
2、loader => 我的理解是翻译官，用来把各种各样的文件翻译成当前环境支持的语言；  plugin => 我的理解是管家，负责打理整个文件中除了翻译以外的任务，包括清除文件，哈希文件名之类的杂活； 

视频地址：链接: https://pan.baidu.com/s/1ogQEOAvjBkDvTZqiz3Fe_w  密码: ij7f
-->
