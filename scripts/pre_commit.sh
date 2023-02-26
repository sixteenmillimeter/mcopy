#!/bin/bash

branch_name=`sh ./scripts/branch_name.sh`

if [[ "${branch_name}" == "main" ]]; then
	npm run patch
else
	echo "no pre-commit on branch ${branch_name}"
fi