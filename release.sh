#!/bin/sh

function exit_if_last_not_success() {
  if [[ "$?" != '0' ]] ; then
    [[ -n $1 ]] && echo $1
    exit $?
  fi
}


which git-release > /dev/null
exit_if_last_not_success '\033[31m git-release required, install it in\033[0m \033[34mhttps://github.com/tj/git-extras\033[0m'


if test $# -gt 0; then
  npm version $1 -m "Release $1"
  exit_if_last_not_success
  git-release $1 -c
else
  echo '\033[31m version number required \033[0m'
  exit 1
fi