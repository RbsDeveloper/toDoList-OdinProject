import { createLayout } from "./layout.js";
import "./styles.css";
import { handleFilterBtnActions, handleInitialContentLoading ,handleProjectBtnClick,handleProjectCreation, handleTaskActions, handleTaskItem } from "./eventHandlers.js";

createLayout()

document.addEventListener('DOMContentLoaded', handleInitialContentLoading())
document.getElementById('projectForm').addEventListener('submit', e => handleProjectCreation(e));
document.getElementById('newTaskForm').addEventListener('submit', e => handleTaskActions(e));
document.getElementById('filteringBtnsContainer').addEventListener('click', e => handleFilterBtnActions(e));
document.getElementById('projectsContainer').addEventListener('click', e => handleProjectBtnClick(e));
document.getElementById('taskBoard').addEventListener('click', e => handleTaskItem(e));
