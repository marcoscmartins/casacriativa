const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./casacriativa.db');

db.serialize(() => {
    // Criar a tabela
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );`);

    // Inserir dados na tabela
    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?, ?, ?, ?, ?);`;

    const values = [
        'https://image.flaticon.com/icons/svg/2729/2729007.svg',
        'Cursos de Programação',
        'Estudo',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quod velit sequi minima aliquam sed rem, praesentium unde laudantium aut. Consequatur repudiandae, cumque quos eligendi ab sint ea animi odit?',
        '#'
    ];

    // Método recebe dois parâmetros, o terceiro é opcional e trata-se de um calback
    // db.run(query, values, (err) => {
    //     if (err) return console.lot(err);
    //     console.log(this);
    // });

    // Deletar um dado da tabela
    // db.run(`DELETE FROM ideas WHERE id = ?`, [1], (err) => {
    //     if (err) return console.log(err);
    //     console.log(this);
    // });

    // Consultar dados na tabela
    // db.all(`SELECT * FROM ideas`, (err, rows) => {
    //     if (err) return console.log(err);
    //     console.log(rows);
    // });
})

module.exports = db;