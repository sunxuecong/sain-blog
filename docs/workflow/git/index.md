### 1. 新建仓库

```sh
# 在当前目录新建一个 Git 仓库
git init

# 新建一个目录，将其初始化为 Git 仓库
git init [project-name]

# 下载一个项目和它的整个代码历史
git clone [url]
```

###  2. 配置Git

```sh
# 查看当前的 Git 配置
git config --list

# 设置使用 Git 时的用户名称
git config --global user.name "用户名"

# 设置使用 Git 时的邮箱地址
git config --global user.email "git账号"

# 配置别名
# 配置别名后效果例如：git br === git branch
git config --global alias.co checkout
git config --global alias.ss status
git config --global alias.cm commit
git config --global alias.br branch
git config --global alias.rg reflog

# 删除全局配置
git config --global --unset alias.xxx
git config --global --unset user.xxx
```

### 3. 向暂存区添加 / 删除文件

```sh
# 添加指定文件或指定目录到暂存区
git add [文件路径 / 目录路径]

# 添加所有文件到暂存区
git add .

# 暂存区的文件退回到工作区
git reset file1 file2

#暂存区的文件全部退回到工作区
git reset
```

###  4. 代码提交

```sh
# 提交暂存区到仓库区
git commit -m [提交信息]

# 替换上一次 commit（如无代码改动，就重写上一次 commit 的提交信息）
git commit --amend -m [提交信息]
```

### 5. 代码推送

```sh
# 将本地仓库的文件推送到远程分支
# 如果远程仓库没有这个分支，会新建一个同名的远程分支
# 如果省略远程分支名，则表示两者同名
git push <远程主机名> <本地分支名>:<远程分支名>
git push origin branchname  

# 如果省略本地分支名，则表示删除指定的远程分支
# 因为这等同于推送一个空的本地分支到远程分支。
git push origin :master
# 等同于
git push origin --delete master

# 建立当前分支和远程分支的追踪关系
git push -u origin master
# 如果当前分支与远程分支之间存在追踪关系
# 则可以省略分支和 -u 
git push

# 不管是否存在对应的远程分支，将本地的所有分支都推送到远程主机
git push --all origin

# 拉取所有远程分支到本地镜像仓库中
git pull

# 拉取并合并项目其他人员的一个分支 
git pull origin branchname  

# 等同于 fetch + merge
git fetch origin branchName
git merge origin/branchName

# 如果远程主机的版本比本地版本更新，推送时 Git 会报错，要求先在本地做 git pull 合并差异，
# 然后再推送到远程主机。这时，如果你一定要推送，可以使用 –-force 选项 
# （尽量避免使用）
git push --force origin | git push -f origin

# 强行推送当前分支到远程仓库，即使有冲突
git push origin --force
```

### 6. 分支

```sh
# 列出所有本地分支
git branch

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 查看本地分支对应的远程分支
git branch -vv 

# 新建一个分支，但依然停留在当前分支
git branch [分支名]

# 新建一个分支，并切换到该分支
git checkout -b [分支名]

# 新建一个分支，指向指定commit
git branch [分支名] [commit id]

# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [分支名] [远程分支名]

# 新建一个空白分支
git checkout --orphan [分支名]

# 切换到指定分支，并更新工作区
git checkout [分支名]

# 切换到上一个分支
git checkout -

# 合并指定分支到当前分支
git merge [分支名]

# 删除分支
git branch -d [分支名]

# 删除远程分支
git push origin --delete [分支名]
git branch -dr [remote/分支名]
```

### 7. 存储

```sh
# 将所有未提交的修改（提交到暂存区）保存至堆栈中
git stash 

# 给本次存储加个备注，以防时间久了忘了
git stash save "存储"

# 存储未追踪的文件
git stash -u

# 查看存储记录
git stash list

# 取出并删除最近一次的 stash
git stash pop

# 取出最近一次的 stash
git stash apply

# 清空所有 stash
git stash clear
```

### 8. 变基

可以看这篇链接，写的很好🔗https://juejin.cn/post/6844903546104135694#heading-9

### 9. 远程仓库

```sh
# 查看所有远程主机
git remote

# 查看关联的远程仓库的详细信息
git remote -v 

# 删除远程仓库的 “关联”
git remote rm projectname 

# 设置远程仓库的 “关联”
git remote set-url origin <newurl>
```

### 10. 标签

```sh
# 查看所有标签
# 注意：标签不是按时间顺序列出，而是按字母排序的。
git tag

# 默认在 HEAD 上创建一个标签 
git tag v1.0

# 指定一个 commit id 创建一个标签 
git tag v0.9 f52c633

# 创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字
git tag -a v0.1 -m "version 0.1 released" 

# 查看 tag 信息
git show [tag]

# 推送一个本地标签
git push origin <tagname>

# 推送全部未推送过的本地标签
git push origin --tags

# 新建一个分支，指向某个tag
git checkout -b [分支名] [tag]

# 删除本地标签
# 因为创建的标签都只存储在本地，不会自动推送到远程。
# 所以，打错的标签可以在本地安全删除。
git tag -d v0.1

# 删除一个远程标签（先删除本地 tag ，然后再删除远程 tag）
git push origin :refs/tags/<tagname>
```

### 11. 查看信息

```sh
# 显示变更的文件
git status

# 显示当前分支的版本历史
git log

# 显示commit历史，以及每次commit发生变更的文件
git log --stat

# 搜索提交历史，根据关键词
git log -S [keyword]

# 显示某个文件的版本历史，包括文件改名
git log --follow [文件路径]
git whatchanged [文件路径]

# 显示指定文件相关的每一次diff
git log -p [文件路径]

# 显示过去5次提交
git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
git blame [file]

# 显示暂存区和工作区的差异
git diff

# 显示工作区与当前分支最新 commit 之间的差异
git diff HEAD

# 显示今天你写了多少行代码
git diff --shortstat "@{0 day ago}"

# 显示当前分支的最近几次提交
git reflog
```

### 12. 版本切换 & 重设 & 撤销

#### 12.1 撤销

```sh
## 如果还没 git add file ，使用该指令进行撤销
git checkout -- fileName  

## 如果已经git add file  ， 但是没有 git commit -m ""
## 暂存区单个或者多个退回到工作区
git reset file1 file2

#暂存区的文件全部退回到工作区
git reset

## 如果已经git add file 并且已经 git commit ,那么回退版本办法是：
git reset --soft HEAD^
# 这样就能成功的撤回你刚刚的commit操作。
# HEAD^的意思是上一个版本，也可以写成HEAD~1
# 如果你进行了2次commit，想都撤回，可以使用HEAD~2
# 注意，这个命令仅仅是撤回commit操作，写的代码仍然保留
```

#### 12.2 checkout 详解

```sh
# 回滚到指定的 HEAD
git checkout HEAD 

# 回滚到最近一次提交的上一个版本
git checkout HEAD^ 

# 回滚到最近一次提交的上2个版本
git checkout HEAD^^ 

# 切换分支，在这里也可以看做是回到项目「当前」状态的方式
git checkout <当前你正在使用的分支>
# 切换到某个指定的 commit 版本
git checkout <commit_id>
# 切换指定 tag 
git checkout <tag>
```

- 在开发的正常阶段，`HEAD` 一般指向 master 或是其他的本地分支，但当你使用 `git checkout <commit id>` 切换到指定的某一次提交的时候，`HEAD` 就不再指向一个分支了——它直接指向一个提交，HEAD 就会处于 detached 状态（游离状态）。
- 切换到某一次提交后，你可以查看文件，编译项目，运行测试，甚至编辑文件而不需要考虑是否会影响项目的当前状态，你所做的一切都不会被保存到主栈的仓库中。当你想要回到主线继续开发时，使用 `git checkout branchName` 回到项目初始的状态（这时候会提示你是否需要新建一条分支用于保留刚才的修改）。
- 哪怕你切换到了某一版本的提交，并且对它做了修改后，不小心提交到了暂存区，只要你切换回分支的时候，依然会回到项目的初始状态。（*注意：你所做的修改，如果 commit 了，会被保存到那个版本中。切换完分支后，会提示你是否要新建一个分支来保存刚才修改的内容。如果你刚才解决了一个 bug ，这时候可以新建一个临时分支，然后你本地自己的开发主分支去合并它，合并完后删除临时分支）。



#### 12.3 reset 详解

`git reset [--hard|soft|mixed|merge|keep] [<commit>或HEAD]`：将当前的分支重设(`reset`)到指定的 `<commit>` 或者 `HEAD` (默认，如果不显示指定 `<commit>`，默认是 `HEAD` ，即最新的一次提交)，并且根据 `[mode]` 有可能更新索引和工作目录。`mode` 的取值可以是 `hard`、`soft`、`mixed`、`merged`、`keep` 。

```sh
# 暂存区的文件退回到工作区
git reset file1 file2

#暂存区的文件全部退回到工作区
git reset

# 重置暂存区与工作区，回退到最近一次提交的版本内容
git reset --hard 

# 重置暂存区与工作区，回退到最近一次提交的上一个版本
git reset --hard HEAD^ 

# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），同时重置暂存区，但工作区不变
git reset <commit>

# 等价于 
git reset --mixed  <commit>

# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），但保持暂存区和工作区不变
git reset --soft  <commit>

# 将当前分支的指针指向为指定 commit（该提交之后的提交都会被移除），同时重置暂存区、工作区
git reset --hard  <commit>
```

- `git reset` 有很多种用法。它可以被用来移除提交快照，尽管它通常被用来撤销暂存区和工作区的修改。不管是哪种情况，它应该只被用于本地修改——你永远不应该重设和其他开发者共享的快照。
- **当你用 reset 回滚到了某个版本后，那么在下一次 git 提交时，之前该版本后面的版本会被作为垃圾删掉。**
- **当我们回退到一个旧版本后，此时再用 git log 查看提交记录，会发现之前的新版本记录没有了。如果第二天，你又想恢复到新版本怎么办？找不到新版本的 commit_id 怎么办？**

**我们可以用 `git reflog` 查看历史命令，这样就可以看到之前新版本的 commit_id ，然后 `git reset --hard commit_id` 就可以回到之前的新版本代码**

- 虽然可以用 git reflog 查看本地历史，然后回复到之前的新版本代码，但是在别的电脑上是无法获取你的历史命令的，所以这种方法不安全。万一你的电脑突然坏了，这时候就无法回到未来的版本。

#### 12.4 revert 详解

```sh
# 生成一个撤销最近的一次提交的新提交
git revert HEAD 
# 生成一个撤销最近一次提交的上一次提交的新提交
git revert HEAD^ 
# 生成一个撤销最近一次提交的上两次提交的新提交
git revert HEAD^^ 
# 生成一个撤销最近一次提交的上n次提交的新提交
git revert HEAD~num 

# 生成一个撤销指定提交版本的新提交
git revert <commit_id>
# 生成一个撤销指定提交版本的新提交，执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息
git revert <commit_id> --no-edit
```

`git revert`命令用来撤销某个已经提交的快照（和 reset 重置到某个指定版本不一样）。它是在提交记录最后面加上一个撤销了更改的新提交，而不是从项目历史中移除这个提交，这避免了 Git 丢失项目历史。

**撤销**（revert）应该用在你想要在项目历史中移除某个提交的时候。比如说，你在追踪一个 bug，然后你发现它是由一个提交造成的，这时候撤销就很有用。

**撤销**（revert）被设计为撤销公共提交的安全方式，重设（reset）被设计为重设本地更改。

因为两个命令的目的不同，它们的实现也不一样：重设完全地移除了一堆更改，而撤销保留了原来的更改，用一个新的提交来实现撤销。千万不要用 `git reset` 回退已经被推送到公共仓库上的 提交，它只适用于回退本地修改（从未提交到公共仓库中）。如果你需要修复一个公共提交，最好使用 git revert。

发布一个提交之后，你必须假设其他开发者会依赖于它。移除一个其他团队成员在上面继续开发的提交在协作时会引发严重的问题。当他们试着和你的仓库同步时，他们会发现项目历史的一部分突然消失了。一旦你在重设之后又增加了新的提交，Git 会认为你的本地历史已经和 origin/master 分叉了，同步你的仓库时的合并提交(merge commit)会使你的同事困惑.



### 13. 分支管理规范

- 实际开发的时候，一人一条分支(个人见解：除非是大项目，参与的开发人员很多时，可以采用 feature 分支，否则一般的项目中，一个开发者一条分支够用了）除此之外还要有一条 develop 开发分支，一条 test 测试分支，一条 release 预发布分支。
  - **develop**：开发分支，开发人员每天都需要拉取/提交最新代码的分支；
  - **test**：测试分支，开发人员开发完并自测通过后，发布到测试环境的分支；
  - **release**：预发布分支，测试环境测试通过后，将测试分支的代码发布到预发环境的分支（这个得看公司支不支持预发环境，没有的话就可以不采用这条分支）；
  - **master**：线上分支，预发环境测试通过后，运营/测试会将此分支代码发布到线上环境；
- 大致流程：
  1. 开发人员每天都需要拉取/提交最新的代码到 **develop 分支**；
  2. 开发人员开发完毕，开始集成测试，测试无误后提交到 **test 分支**并发布到测试环境，交由测试人员测试；
  3. 测试环境通过后，发布到 **release** 分支上，进行预发环境测试；
  4. 预发环境通过后，发布到 **master** 分支上并打上标签（tag）；
  5. 如果线上分支出了 bug ，这时候相关开发者应该基于预发布分支（没有预发环境，就使用 master 分支），新建一个 **bug 分支**用来临时解决 bug ，处理完后申请合并到 预发布 分支。这样做的好处就是：不会影响正在开发中的功能。

**预发布环境的作用：** 预发布环境是正式发布前最后一次测试。因为在少数情况下即使预发布通过了，都不能保证正式生产环境可以100%不出问题；预发布环境的配置，数据库等都是跟线上一样；有些公司的预发布环境数据库是连接线上环境，有些公司预发布环境是单独的数据库；如果不设预发布环境，如果开发合并代码有问题，会直接将问题发布到线上，增加维护的成本。
