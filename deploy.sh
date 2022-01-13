#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:Jin-1999/Jin-1999.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git remote rm origin
# git remote add origin https://github.com/Jin-1999/Jin-1999.github.io.git
# git push -u origin main
# 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

# ssh 
# git config --global  --list 
# ssh-keygen -t rsa -C 739068681@qq.com
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDMN+8XCz7ot28a7UuxWXj6aEsPKOTA2513QVsidObgX1mZjMFCahtQXFnnILa1It0kFFm4UtayY1pNOl6HLRx2S2n+gMhVUL7RSmvQj4aOkLiqwO5N92OV52m4x89cTfIIER5OBKnyR29y4it1gJCnqZdR/KLkHGBYc0H5SbauGkfbdrdoYOyRFmGZb+sBvZukgO16t9reQUHn7kWJsfd2sS52UYwdQnvrZh+x8Y/sPFqY9sLCZ0lhPb0ApIxtwpp41RAQdZuFYnX4NuSOHCfNKiOOf7REkudhaUZ9XBjK9QqZTThSwy1SshsWXH1oEDO3S1DlGvhIJWUlBNGX+nM5Ok538ZUAp1JYS3edt5MK9jMbGJd/48geNJ7N6OT33abyiaxcs+DwXwlNnWoPYdNatWJsHGdGo/IRGeipWrTSVMTNDnMpYj/SjX2FxknstBDfWHhqhv9togVmZutFo8SJegOJAt8DDZkBlc+5iH/FeMe0zDri+nLHcgzMlQA6v/8= 739068681@qq.com

cd -