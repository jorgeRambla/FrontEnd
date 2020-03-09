#!/usr/bin/env bash

build_based_on_env_var() 
{
    if [ -z "${APP_STAGE}" ]; then
        echo 'Performing default Production building'
        APP_STAGE="prod"
    fi
    case $APP_STAGE in
        prod)
            echo 'Building production enviroment'
            ng build --configuration=production
            break
		    ;;
        staging)
            echo 'Building pre-production enviroment'
            ng build --configuration=staging
            break
		    ;;
        *)
		    echo "Building default profile"
            ng build --configuration=production
		    ;;
    esac
    return
}

build_based_on_env_var