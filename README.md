# Aula Prática: Mensageria com Amazon SQS

Este projeto é uma aplicação didática para demonstrar o uso de filas de mensagens com Amazon SQS, utilizando o LocalStack para simulação local.

## 🎯 Objetivos da Aula

- Entender o conceito de mensageria e filas
- Aprender sobre Amazon SQS (Simple Queue Service)
- Implementar produtor e consumidor de mensagens
- Trabalhar com LocalStack para desenvolvimento local
- Entender o fluxo de mensagens entre filas

## 🛠️ Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- AWS SDK v3
- SQS Consumer
- LocalStack

## 📋 Estrutura do Projeto

```
src/
├── core/
│   └── consumers/
│       └── email.consumer.ts   # Consumer de emails
├── domain/
│   ├── entities/
│   │   └── email.entity.ts     # Entidade de Email
│   └── enum/
│       └── emailStatus.enum.ts # Tipos de mensagens
├── infrastructure/
│   ├── config/
│   │   └── aws.config.ts       # Configurações do AWS
│   └── services/
│       └── sqs.service.ts      # Serviço SQS
└── api/
    └── routes/
        └── email.routes.ts     # Rotas da API para emails
```

## 🚀 Como Executar

1. **Pré-requisitos**
   - Node.js 18+
   - Docker e Docker Compose
   - AWS CLI (para comandos de teste)

2. **Configuração do Ambiente**
   ```bash
   # Instale as dependências
   npm install

   # Copie o arquivo de ambiente
   cp .env.example .env
   ```

3. **Iniciar o LocalStack**
   ```bash
   # Inicia o LocalStack e cria as filas automaticamente
   docker-compose up -d
   ```

4. **Executar a Aplicação**
   ```bash
   npm run dev
   ```

## 📝 Exemplos de Uso

### Enviar um Email para a Fila
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "exemplo@email.com",
    "subject": "Teste de Email",
    "body": "Este é um email de teste"
  }'
```

### Verificar Filas no LocalStack
```bash
# Listar todas as filas
aws --endpoint-url=http://localhost:4566 sqs list-queues

# Ver mensagens na fila de processados
aws --endpoint-url=http://localhost:4566 sqs receive-message \
  --queue-url http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/email-processado
```

## 📚 Conceitos Abordados

1. **Mensageria**
   - O que são filas de mensagens
   - Benefícios do uso de mensageria
   - Padrões de mensageria
   - Fluxo de mensagens entre filas

2. **Amazon SQS**
   - Tipos de filas:
     - **Standard Queue**
       - Não garante ordem de entrega
       - Pode entregar mensagens duplicadas
       - Throughput ilimitado
       - Baixa latência (< 10ms)
       - Mais econômica
       - Ideal para: logs, métricas, notificações
     - **FIFO Queue**
       - Garante ordem exata (First-In-First-Out)
       - Evita duplicação de mensagens
       - Throughput limitado (300 TPS/grupo)
       - Latência ligeiramente maior
       - Mais cara
       - Ideal para: pedidos, transações, inventário
   - Atributos de mensagens
   - Dead Letter Queues (DL)
   - Envio de mensagens entre filas

3. **LocalStack**
   - O que é e para que serve
   - Configuração e uso
   - Limitações e diferenças para AWS real:
     - **Escalabilidade**
       - Não suporta o mesmo nível de escalabilidade da AWS
       - Limitações de throughput e concorrência
       - Performance pode variar dependendo do hardware local
     - **Recursos Suportados**
       - Nem todos os recursos da AWS estão disponíveis
       - Algumas APIs podem ter comportamento diferente
       - Novos recursos podem demorar para serem implementados
     - **Persistência**
       - Dados são armazenados localmente
       - Perda de dados ao reiniciar o container
       - Necessidade de configuração adicional para persistência
     - **Segurança**
       - Não implementa todas as políticas de segurança da AWS
       - Credenciais são simplificadas
       - IAM e políticas de acesso são limitados
     - **Custos**
       - Não reflete os custos reais da AWS
       - Não possui sistema de cobrança
       - Não considera limites de quota
   - Scripts de inicialização

4. **Implementação**
   - Arquitetura em camadas (API, Core, Domain, Infrastructure)
   - Produtor de mensagens
   - Consumidor de mensagens
   - Tratamento de erros
   - Garantias de entrega
   - Processamento assíncrono

5. **Boas Práticas**
   - Separação de responsabilidades
   - Tipagem forte com TypeScript
   - Configuração centralizada
   - Logs estruturados
   - Tratamento de erros

## 🔍 Pontos de Atenção

- O projeto usa LocalStack para desenvolvimento local
- As credenciais são fictícias (`test/test`)
- O consumer processa mensagens em tempo real
- A API retorna 202 (Accepted) para indicar que a mensagem foi aceita
- As filas são criadas automaticamente ao iniciar o LocalStack
- O processamento de emails é simulado com um delay
- Os emails processados são enviados para uma fila separada

## 📖 Material de Apoio

- [Documentação AWS SQS](https://docs.aws.amazon.com/sqs/)
- [Documentação LocalStack](https://docs.localstack.cloud/)
- [Documentação SQS Consumer](https://github.com/bbc/sqs-consumer)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express Documentation](https://expressjs.com/)

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias para o projeto.
