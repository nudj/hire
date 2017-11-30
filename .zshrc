source /root/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
export PATH=$PATH:/usr/src/node_modules/.bin

PROMPT='hire» '

alias run="node ."
alias dev='webpack --config ./webpack.dll.js --bail --hide-modules && nodemon --config ./nodemon.json -e js,html,css --quiet --watch ./ --delay 250ms -x "printf \"\n\nBuilding...\n\" && webpack --config ./webpack.config.js --bail --hide-modules && node ."'
alias test="standard && flow && mocha --recursive test"
alias tdd='nodemon \
	--quiet \
	--watch ./ \
	--delay 250ms \
	-x "mocha --recursive test || exit 1"'
alias flow='flow --quiet'
alias standardFix='./node_modules/.bin/standard --fix'

yank () {
  cd ./@nudj/$1 && yarn link && cd ../..
}

alias idev="yank framework && yank components && yank api && yank library && dev"
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
