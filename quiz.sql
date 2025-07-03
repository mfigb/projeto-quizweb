
CREATE DATABASE quizweb;
USE quizweb;


CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(800) NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    explanation LONGTEXT NOT NULL
);


INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
'Diversos componentes são incorporados nas aplicações que obedecem às especificações JEE. Com relação à função do serviço JAAS, assinale a alternativa CORRETA:',
'Definir as configurações da camada de negócio, simplificando as alterações no layout.',
'Aplicar o protocolo HTTPS para encriptar as requisições dos usuários.',
'Fornecer mecanismos de autenticação e autorização aos usuários.',
'Habilitar a criação de aplicações dinâmicas por meio do uso de AJAX.',
'C',
'O JAAS (Java Authentication and Authorization Service) é uma API padrão do Java que faz parte da plataforma JEE (Java Enterprise Edition). Sua principal função é exatamente prover um framework robusto para autenticação e autorização dentro de aplicações Java. Permite integração com bancos de dados, LDAP, entre outros.'
),
(
'Uma das tecnologias Java para desenvolvimento de aplicações web é o JSF, que utiliza arquitetura MVC. Com relação ao MVC em uma aplicação JSF, assinale a alternativa CORRETA:',
'Uma classe Managed Bean pertence à camada view da aplicação, pois controla formulários JSF e seus componentes.',
'Uma classe entidade, que resolve o problema do objeto relacional, pertence à camada view da aplicação.',
'Uma classe de serviço, com regras de negócio, pertence à camada view da aplicação.',
'Uma classe Managed Bean pertence à camada controller da aplicação, pois controla formulários JSF e seus componentes.',
'D',
'Os Managed Beans atuam como controladores no padrão MVC em JSF. Intermediam a interação entre a View (páginas XHTML) e o Model (serviços e entidades).'
),
(
'Session Bean é um componente que executa a lógica da aplicação. Sobre o componente que pode ser considerado um terceiro tipo de Session Bean, permitindo a manutenção e o compartilhamento de estado entre todos os usuários de uma aplicação, assinale a alternativa CORRETA:',
'Singleton Session Bean.',
'Hibernate.',
'Stateful.',
'Stateless.',
'A',
'Os Singleton Session Beans são únicos na aplicação e mantêm estado compartilhado entre todos os usuários. São úteis para configurações globais, cache etc.'
),
(
'O JSF possui suporte nativo ao AJAX desde a versão 2.0. Sobre os eventos que o JSF permite utilizar AJAX com métodos no managed bean, assinale a alternativa CORRETA:',
'Tabelas, teclado e mouse.',
'Formulários, tabelas, teclado e mouse.',
'Formulários, tabela e mouse.',
'Formulários, teclado e mouse.',
'D',
'Formulários: componentes como botões e campos. Teclado: eventos como keypress. Mouse: eventos como click e mouseover. Todos podem acionar métodos em managed beans via AJAX.'
),
(
'O JSF é uma das tecnologias para desenvolvimento de aplicações web que permite desenvolver um sistema de cadastro mais rapidamente, pois não é necessária implementação de códigos-fonte CSS e Javascript. Com relação ao desenvolvimento de formulários JSF, assinale a alternativa CORRETA:',
'Uma classe Managed Bean serve como controller, recebendo os valores dos campos, porém, seus métodos não podem ser invocados por componentes do JSF.',
'Para que o evento de um componente do JSF funcione, este deve invocar uma função Javascript para que se invoque o método da classe controller.',
'Em uma classe Managed Bean são implementados os componentes visuais do JSF.',
'No JSF, a classe Managed Bean funciona como a camada controller da aplicação, cujos métodos podem ser invocados por eventos de componentes do formulário.',
'D',
'No JSF, os métodos dos Managed Beans são diretamente invocados por eventos nos componentes das páginas XHTML. Eles atuam como controllers no padrão MVC.'
),
(
'Para o desenvolvimento de aplicações com JEE, é necessário configurar o ambiente. Sobre alguns dos programas que podem ser usados, assinale a alternativa CORRETA:',
'Windows 10, Netbeans e SQL Server.',
'MySQL, Linux e Access.',
'Eclipse, MySQL e Oracle.',
'Wildfly, Netbeans e MySQL.',
'D',
'Wildfly é um servidor de aplicações JEE. Netbeans é uma IDE com suporte a JEE. MySQL é um SGBD compatível com aplicações JEE. Juntos, formam um ambiente robusto.'
),
(
'A linguagem de programação Java possui diversos recursos e frameworks. Com relação ao stateless session bean, assinale a alternativa CORRETA:',
'Quando definida a anotação @PostConstruct em um método de um objeto stateless session bean, a implementação deste é executada quando o objeto é eliminado da memória.',
'As características do stateless session bean favorecem na escalabilidade da aplicação.',
'As configurações para melhorar a eficiência das chamadas dos stateless session beans são as mesmas para todos os servidores de aplicação.',
'O ciclo de vida de um Stateless Session Bean possui três estados definidos: em construção, não existe e pronto.',
'B',
'Stateless Session Beans não mantêm estado e podem ser reutilizados pelo contêiner, favorecendo a escalabilidade. @PostConstruct é executado após a criação da instância.'
),
(
'Nas tecnologias da família EJB é que percebemos a verdadeira extensão das capacidades do JAVAEE. Sobre esses recursos, assinale a alternativa INCORRETA:',
'Multithreading e Concorrência: a arquitetura EJB é fortemente integrada com os componentes da plataforma Java EE.',
'Transações: a arquitetura EJB define um suporte para utilização de transações...',
'Segurança: suporte para realizar autenticação e autorização de forma declarativa...',
'Remotabilidade: aplicações EJB podem ser acessadas remotamente...',
'A',
'Multithreading não deve ser gerenciado diretamente pelo desenvolvedor em EJB. O contêiner gerencia isso para garantir a segurança e consistência.'
),
(
'Sobre os tipos de EJB, o tipo que representa um processo ou regra de negócio através de componentes com classes e métodos é:',
'Stateless.',
'JSF.',
'JPA.',
'Stateful.',
'A',
'O tipo Stateless é o EJB indicado para representar regras de negócio sem manter estado entre as chamadas.'
),
(
'Os tipos de dados são combinações de valores e operações. O PHP suporta diversos tipos. Nesse contexto, assinale a alternativa CORRETA para o tipo que representa valores inteiros:',
'Double',
'String',
'Integer',
'Inteiro',
'C',
'Integer é o tipo usado em PHP para representar números inteiros. Double é para números decimais. String é texto. "Inteiro" é apenas a tradução literal.'
);
