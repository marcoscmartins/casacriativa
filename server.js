// adicionando o express na nossa aplicação
const express = require('express');

// instanciando a nossa aplicação
const server = express();


const ideas = [
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        title: 'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        title: 'Exercícios',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        title: 'Meditação',
        category: 'Mentalidade',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        title: 'Karaoke',
        category: 'Diversão em Família',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729038.svg',
        title: 'Pintura',
        category: 'Criatividade',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729048.svg',
        title: 'Recortes',
        category: 'Criatividade',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        url: '#',
    },
]

// configurações dos arquivos estáticos
// a pasta public passa a funcionar como a pasta raiz
server.use(express.static('public'));

// configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true,
})

// comunicando o front com o back por meio da rota /
server.get("/", (request, response) => {
    // return response.sendFile(__dirname + "/index.html");
    // usando o nunjucks

    const reversed = [...ideas].reverse();

    let lastIdeas = [];
    for (let idea of reversed) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea);
        }
    }

    return response.render('index.html', {ideas: lastIdeas});
});
server.get("/ideias", (request, response) => {
    // return response.sendFile(__dirname + "/ideias.html");
    // usando o nunjucks

    const reversed = [...ideas].reverse();
    return response.render('ideias.html', { ideas: reversed});
});

// servidor ligado na porta 3000
server.listen(3000);