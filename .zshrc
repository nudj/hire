source /root/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
export PATH=$PATH:/usr/src/node_modules/.bin

PROMPT='hire» '

alias run="yarn run build:dlls && yarn run build:client && node ."
alias dev='yarn run build:dlls && nodemon --config ./nodemon.json -e js,html,css --quiet --watch ./ --delay 250ms -x "yarn run build:client && node ."'
alias test="standard && mocha --compilers js:babel-core/register --recursive test/unit"
alias tdd='nodemon \
	--config ./nodemon-tdd.json \
	--quiet \
	--watch ./ \
	--delay 250ms \
	-x "mocha --compilers js:babel-core/register --recursive test/unit || exit 1"'
alias standardFix='./node_modules/.bin/standard --fix'

yank () {
  for package in "$@"; do
    cd /usr/src/yank/$package && yarn link && cd /usr/src && yarn link $package
  done
}

alias idev="yank @nudj/framework @nudj/components @nudj/api @nudj/library && dev"
alias ll="ls -la"
alias d="docker"
alias dm="docker-machine"
alias ds="docker-swarm"
alias dco="docker-compose"

# changes hex 0x15 to delete everything to the left of the cursor,
# rather than the whole line
bindkey "^U" backward-kill-line

# binds hex 0x18 0x7f with deleting everything to the left of the cursor
bindkey "^X\\x7f" backward-kill-line

# adds redo
bindkey "^X^_" redo

# history substring search
zle -N history-substring-search-up
zle -N history-substring-search-down
bindkey "^[OA" history-substring-search-up
bindkey "^[OB" history-substring-search-down

source /root/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /root/.zsh/zsh-history-substring-search/zsh-history-substring-search.zsh
