import React, { useCallback, useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const initFech = useCallback(async () => {
    const response = await api.get("repositories");
    setRepositories(response.data);
  }, [setRepositories]);

  useEffect(() => {
    initFech();
  }, [initFech]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Repo2",
      url: "http://teste",
      techs: ["NodeJS"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
