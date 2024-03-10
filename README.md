# Sauter

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 17.2.3.

## Servidor de desenvolvimento

Execute `npm start` para iniciar um servidor de desenvolvimento. Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## Arquitetura

Container-Presentation: 
Neste padrão, os componentes são divididos em duas categorias principais: os componentes de Container (ou Smart) e os componentes de Presentation (ou Dumb/stateless).

## Funcionalidades

Visualização de Baralhos:

Os usuários podem visualizar uma lista de todos os seus baralhos atualmente cadastrados. Cada baralho é exibido com informações resumidas, como nome, quantidade de cartas, ou outras informações relevantes.

Criação de Novo Baralho:

Os usuários têm a capacidade de criar novos baralhos. Eles podem especificar um nome para o novo baralho.

Remoção de Baralhos:

Os usuários podem excluir baralhos existentes. Isso removerá permanentemente o baralho e todas as suas cartas associadas do sistema. Antes de confirmar a exclusão, é solicitada uma confirmação para evitar remoções acidentais.

Edição de Baralhos:

Os usuários têm a capacidade de editar as informações de um baralho existente. Eles podem alterar o nome do baralho, adicionar ou remover cartas.

Visualização de Detalhes do Baralho:

Os usuários podem clicar em um baralho específico para visualizar seus detalhes.

Criação de um Baralho:

O usuário pode criar um novo baralho personalizado para suas necessidades específicas.

O campo de pesquisa permite que o usuário procure cartas por nome.

Ao criar um baralho, o usuário tem a liberdade de atribuir um nome exclusivo ao baralho, permitindo uma identificação fácil e rápida.

Além de nomear o baralho, o usuário pode adicionar cartas a ele, escolhendo-as de uma lista de cartas disponíveis.

O baralho resultante deve cumprir com os requisitos padrão do jogo, contendo entre 24 e 60 cartas para garantir uma experiência de jogo equilibrada e diversificada.

Uma restrição é aplicada para evitar a inclusão de mais de 4 cartas com o mesmo nome (não ID) no baralho, conforme as regras do jogo.

Após concluir a criação do baralho, o usuário pode salvá-lo. Ao fazer isso, o sistema retorna à página principal, exibindo a lista atualizada de todos os baralhos disponíveis.

Detalhes do Baralho:

Ao visualizar os detalhes de um baralho específico, o usuário tem acesso a informações cruciais sobre o conteúdo do baralho.

O usuário pode ver quantos Pokémon e cartas de treinador estão presentes no baralho, identificando-os com base no atributo "supertype". Isso proporciona uma visão clara da composição do baralho em termos de tipos de cartas.

Da mesma forma, o usuário pode ver quantos tipos únicos de Pokémon, cartas de treinador e cartas de energia estão presentes no baralho, fornecendo uma visão mais detalhada da composição e estratégia do baralho.

## Ambiente de desenvolvimento

Angular 17
Tailwind CSS
UI Infragistics
Json Server
ngx-spinner
concurrently
Editor de Texto ou IDE: visual studio code
Node.js e npm
Git
