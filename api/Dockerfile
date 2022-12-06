FROM python:3.8.13-alpine

WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
COPY . .

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]