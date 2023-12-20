# la_capitale
 
CONTAINER_ID_OR_NAME="bb647442f6c7"
CONTAINER_PATH=$(docker exec $CONTAINER_ID_OR_NAME pwd)
DIR="/public"
docker cp $CONTAINER_ID_OR_NAME:$CONTAINER_PATH$DIR /home/allSave
