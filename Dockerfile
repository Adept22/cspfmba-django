ARG PYTHON_VERSION=3.10

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:${PYTHON_VERSION}-alpine as django_python

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR /srv/app

# Install pip requirements
COPY requirements.txt .
RUN apk add --no-cache postgresql-libs; \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev; \
    python3 -m pip install -r requirements.txt --no-cache-dir; \
    apk --purge del .build-deps

COPY . .

RUN chmod +x manage.py

ENTRYPOINT ["docker-entrypoint"]

CMD ["manage.py", "runserver", "0.0.0.0:80"]
