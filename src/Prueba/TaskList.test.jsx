import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import TaskList from '../components/TaskList';

jest.mock('axios');

describe('TaskList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ],
    });
  });

  it('renders task list', async () => {
    render(
      <Router>
        <TaskList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('opens delete confirmation modal', async () => {
    render(
      <Router>
        <TaskList />
      </Router>
    );

    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
  });
});