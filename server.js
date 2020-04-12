// adicionando o express na nossa aplicação
const express = require('express');

// instanciando a nossa aplicação
const server = express();

const db = require('./db');

// configurações dos arquivos estáticos
// a pasta public passa a funcionar como a pasta raiz
server.use(express.static('public'));

// habilitar uso do req.body
server.use(express.urlencoded({extended:true}));

// configuração do nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('views', {
    express: server,
    noCache: true,
})

// comunicando o front com o back por meio da rota /
server.get("/", (request, response) => {

    db.all(`SELECT * FROM ideas`, (err, rows) => {
        if (err) {
            console.log(err);
            return response.send('Erro no banco de dados.')
        }
        
        const reversed = [...rows].reverse();

        let lastIdeas = [];
        for (let idea of reversed) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }

        return response.render('index.html', {ideas: lastIdeas});
    });
});
server.get("/ideias", (request, response) => {

    db.all(`SELECT * FROM ideas`, (err, rows) => {

        if (err) {
            console.log(err);
            return response.send('Erro no banco de dados.')
        }
        
        const reversed = [...rows].reverse();
        return response.render('ideias.html', { ideas: reversed});
    });
});
server.post("/", (request, response) => {
    // Inserir dados na tabela
    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?, ?, ?, ?, ?);`;

    const values = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link
    ]

    // Método recebe dois parâmetros, o terceiro é opcional e trata-se de um calback
    db.run(query, values, (err) => {
        if (err) {
            console.log(err);
            return response.send('Erro no banco de dados.')
        }
        return response.redirect('/ideias')
    });
})

// servidor ligado na porta 3000
server.listen(3000);