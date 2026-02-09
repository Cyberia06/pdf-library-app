#!/bin/sh
echo "Starting application on port $PORT"
exec java -Dserver.port="$PORT" -jar app.jar