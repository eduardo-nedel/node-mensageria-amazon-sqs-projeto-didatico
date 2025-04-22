#!/bin/bash

# Aguarda o LocalStack estar pronto
until curl -s http://localhost:4566/_localstack/health | grep -q '"running"'; do
    echo "Aguardando LocalStack iniciar..."
    sleep 1
done

echo "LocalStack está pronto. Criando filas..."

# Cria a fila SQS para pedidos
aws --endpoint-url=http://localhost:4566 sqs create-queue \
    --queue-name minha-queue-exemplo

# Cria a fila SQS para emails processados
aws --endpoint-url=http://localhost:4566 sqs create-queue \
    --queue-name email-processado

echo "Filas criadas com sucesso!" 
