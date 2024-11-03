import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const TaskList = () => {
  // Static list of tasks with completion status
  const tasks = [
    { text: "Basic design", completed: true },
    { text: "Better design", completed: false },
    { text: "Copy code", completed: true },
    { text: "Highlight code", completed: true },
    { text: "Read all files names from JSON file", completed: true },
    { text: "Get lua file content", completed: true },
    { text: "Add function code", completed: true },
    { text: "Add function variables", completed: false },
    { text: "Add function return", completed: false },
    { text: "Add function required", completed: false },
    { text: "Add function name for (function)", completed: true },
    { text: "Add function name for (Object::function)", completed: false },
    { text: "Search in files list", completed: true },
    { text: "Search in folder list", completed: false },
    { text: "Search in complete code", completed: false },
    { text: "Complex search in all complete code", completed: false },
    { text: "Complex search filter Functions in all complete code", completed: false },
    { text: "Complex search filter Variables in all complete code", completed: false },
    { text: "Complex search filter Class in all complete code", completed: false },
    { text: "Add Learn LUA section", completed: false },
    { text: "Add Learn modding section", completed: false },
    { text: "Add Contact section", completed: false },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom style={{marginTop: "20px"}}>
        I have made this website for helping modders for the game Don't Starve Together!<br/>
        I hope you will find all you need here.
        </Typography>
      <Typography variant="h4" align="center" gutterBottom style={{marginTop: "75px"}}>
        Todo List
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          {tasks.map((task, index) => (
            <Grid item xs={6} key={index}> {/* Each item takes half the width */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {task.completed ? (
                  <CheckIcon style={{ color: 'green', marginRight: '10px' }} />
                ) : (
                  <CancelIcon style={{ color: 'red', marginRight: '10px' }} />
                )}
                <Typography variant="body1">{task.text}</Typography>
              </div>
              {index < tasks.length - 1 && <Divider />}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default TaskList;
