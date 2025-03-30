import express from 'express';

const app = express();
const port = 3000;


app.use(express.json());


let users = [
    { id: 1, name: 'Kusum', email: 'kusum@gmail.com' },
    { id: 2, name: 'Verma', email: 'verma@gmail.com' }
];


app.get('/users', (req, res) => {
    res.json(users);
});


app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});


app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.json(user);
});


app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: 'User deleted successfully' });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
