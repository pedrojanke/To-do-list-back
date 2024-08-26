import cors from 'cors';
import express from 'express';

const app = express();

// Configuração do CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.use(express.json());

app.get('*', (req, res) => {
    res.json([
        { name: 'Projeto 1' },
        { name: 'Projeto 2' }
    ]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
