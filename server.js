const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3001;
const app = express();
const { sportTeams } = require('./data.js');

app.locals = {
  title: 'Network Request Practice',
  sportTeams,
}

app.use(cors());

app.use(express.json());

app.get('/api/v1/sport-teams', (req, res) => {
  res.status(200).json(app.locals.sportTeams);
});

app.post('/api/v1/sport-teams', (req, res) => {
  const newSportTeam = req.body;

  for (let requiredParameter of ['id', 'name', 'head_coach', 'sport']) {
    if (!newSportTeam[requiredParameter]) {
      return res.status(422).json({
        message: `You are missing a required parameter of ${requiredParameter}`
      });
    }
  }

  const { id, name, head_coach, sport } = newSportTeam;

  app.locals.sportTeams = [...app.locals.sportTeams, { id, name, head_coach, sport }];

  return res.status(201).json({ id, name, head_coach, sport });
});

app.delete('/api/v1/sport-teams/:id', (req, res) => {
  const { id } = req.params;
  const match = app.locals.sportTeams.find(sportTeam => sportTeam.id == id);

  if (!match) {
    return res.status(404).json({
      message: `No sport team found with an id of ${id}`
    });
  }

  const filteredSportTeams = app.locals.sportTeams.filter(user => user.id != id);

  app.locals.sportTeams = filteredSportTeams;

  return res.status(200).send(app.locals.sportTeams);
});

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});
