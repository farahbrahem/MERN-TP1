const express = require('express');

const app = express();

const PORT = 3000;
app.use(express.json());
// Route principale
app.get('/', (req, res) => {
    res.json({
        message: "Bonjour, je suis l’API du blog"
    });
});

const articles = [
    {
        id: 1,
        title: "Bienvenue sur le blog",
        author: "Admin"
    },
    {
        id: 2,
        title: "Mon premier serveur Express",
        author: "Aya"
    },
    {
        id: 3,
        title: "Tester une API avec Postman",
        author: "Aya"
    }
];
app.get('/api/articles', (req, res) => {
    const { author } = req.query;

    let resultat = articles;

    if (author) {
        resultat = articles.filter(a => a.author === author);
    }

    res.json({
        total: resultat.length,
        articles: resultat
    });
});
app.get('/api/articles/:id', (req, res) => {
    const id = Number(req.params.id);

    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({
            error: `Article ${id} introuvable`
        });
    }

    res.json(article);
});
let prochainId = 4;

app.post('/api/articles', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            error: "Le titre et l’auteur sont obligatoires"
        });
    }

    const nouvelArticle = {
        id: prochainId,
        title: title,
        author: author
    };

    prochainId = prochainId + 1;

    articles.push(nouvelArticle);

    res.status(201).json({
        message: "Article créé",
        article: nouvelArticle
    });
});
app.get('/about', (req, res) => {
    res.json({
        application: "Mon API Blog",
        utilisateur: "Marie",
        version: "1.0.0"
    });
});
const users = [
    {
        id: 1,
        name: "Aya",
        email: "aya@gmail.com"
    },
    {
        id: 2,
        name: "Marie",
        email: "marie@gmail.com"
    },
    {
        id: 3,
        name: "aziz",
        email: "aziz@gmail.com"
    }
];

app.get('/api/users', (req, res) => {
    const { name } = req.query;

    let resultat = users;

    if (name) {
        resultat = users.filter(u => u.name === name);
    }

    res.json(resultat);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.json(user);
});
app.post('/contact', (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({
            error: "L'email et le message sont obligatoires"
        });
    }

    res.status(200).json({
        message: "Merci, votre message a bien été reçu"
    });
});


// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur disponible sur http://localhost:${PORT}`);
});