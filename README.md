# Desafio Técnico AutoU

Uma API simples desenvolvida com **FastAPI** para classificar e processar emails. Permite enviar emails via texto ou arquivo e receber uma categorização automática e resposta sugerida.

---

## Tecnologias Utilizadas

- Python 3.10+
- FastAPI
- Uvicorn
- CORS Middleware

---

## Funcionalidades

- Receber texto de email ou arquivo (.txt / .pdf)
- Classificar emails em categorias
- Gerar respostas automáticas

---

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Diretório

```bash
cd .
```

3. Criar ambiente virtual

```bash
python -m venv venv
```

## Instalar Libs

1. Windows

```bash
venv/Scripts/activate
```

2. Linux / macOS

```bash
source venv/bin/activate
```

```bash
pip install -r requirements.txt
```

## Rode o servidor

```bash
uvicorn server.main:app --reload
```

## Acesso a Documentação

http://localhost:8000/
