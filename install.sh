#!/bin/bash

# for file in `ls src $1`       #注意此处这是两个反引号，表示运行系统命令
#     do
#         if [ -d $1"/"$file ]  #注意此处之间一定要加上空格，否则会报错
#         then
#             read_dir $1"/"$file
#         else
#             echo $1"/"$file   #在此处处理文件即可
#         fi
#     done

function demoFun1(){
    echo "这是我的第一个 shell 函数!"
    return `expr 1 + 1`
}

demoFun1
echo $?

function demoFun2(){
 echo "这是我的第二个 shell 函数!"
 expr 1 + 1
}

demoFun2
echo $?
demoFun1
echo 在这里插入命令！
echo $?