# requisito funcionais

[ ] Criar um parceiro
[ ] Carregar parceiro pelo `id`
[ ] Buscar parceiro

# Rodar o projeto

Requisitos: ter o node instalado e o docker para rodar o banco de dados. Além disso quando for iniciar o postgresql é necessário instalar a extensão postgis nos dois bancos. a seguir vou mostrar como fazer isso.

1. com o docker instalado inicie os bancos de dados com o comando abaixo:

```bash
  docker-compose up
```

2. em outro terminal verifique quais são os id ou nome dos containers que estão rodando com o comando abaixo:

```bash
  docker ps
```

3. agora com o id ou nome do container do banco de dados postgresql execute o comando abaixo para acessar o bash do container:

```bash
  docker exec -it <id ou nome do container> bash
```

4. e execute o comando a abaixo para instalar a extensão postgis no banco de dados:

```bash
  apt-get update && apt-get install postgis -y
```