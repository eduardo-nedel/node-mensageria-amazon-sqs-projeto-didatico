# Exemplos Práticos para Aula de SQS

## 1. Enviando Mensagens para a Fila

### Exemplo 1: Email Simples
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "aluno@exemplo.com",
    "subject": "Bem-vindo à Aula de SQS",
    "body": "Esta é uma mensagem de teste enviada para a fila SQS."
  }'
```

### Exemplo 2: Email com Formatação
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "professor@exemplo.com",
    "subject": "Relatório de Aula",
    "body": "A aula sobre SQS foi concluída com sucesso!\n\nPontos abordados:\n- Mensageria\n- Filas SQS\n- LocalStack\n- Consumidores"
  }'
```

## 2. Monitorando o Consumer

### Exemplo 1: Logs do Consumer
```bash
# Em um terminal, inicie a aplicação
npm run dev

# Em outro terminal, envie uma mensagem
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "monitor@exemplo.com",
    "subject": "Teste de Monitoramento",
    "body": "Esta mensagem será processada pelo consumer."
  }'
```

### Exemplo 2: Health Check
```bash
curl http://localhost:3000/health
```

## 3. Trabalhando com o LocalStack

### Exemplo 1: Verificando a Fila
```bash
# Lista todas as filas disponíveis
aws --endpoint-url=http://localhost:4566 sqs list-queues

# Verifica atributos da fila
aws --endpoint-url=http://localhost:4566 sqs get-queue-attributes \
  --queue-url http://localhost:4566/000000000000/minha-queue-exemplo \
  --attribute-names All
```

### Exemplo 2: Listando Mensagens na Fila
```bash
# Recebe mensagens da fila
aws --endpoint-url=http://localhost:4566 sqs receive-message \
  --queue-url http://localhost:4566/000000000000/minha-queue-exemplo

# Recebe mensagens com atributos específicos
aws --endpoint-url=http://localhost:4566 sqs receive-message \
  --queue-url http://localhost:4566/000000000000/minha-queue-exemplo \
  --attribute-names All \
  --message-attribute-names All
```

## 4. Cenários de Erro

### Exemplo 1: Mensagem Inválida
```bash
# Falta o campo 'to'
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Mensagem Inválida",
    "body": "Esta mensagem não será processada."
  }'
```

### Exemplo 2: Erro no Consumer
```bash
# Envie uma mensagem com formato inválido
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "erro@exemplo.com",
    "subject": "Teste de Erro",
    "body": "{invalid json}"
  }'
```
