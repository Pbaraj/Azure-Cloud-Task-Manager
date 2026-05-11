# Azure Cloud Web App with React Frontend and FastAPI Backend

A full-stack task management web application built with React.js, FastAPI, SQLAlchemy, and SQLite, deployed using Microsoft Azure services.

## Features

- Create, view, update, complete, and delete tasks
- React.js frontend with Axios API integration
- FastAPI backend with REST API endpoints
- SQLite database with SQLAlchemy ORM
- CORS configuration for frontend-backend communication
- Frontend deployed on Azure Blob Storage Static Website
- Backend deployed on Azure App Service
- GitHub Actions workflow for backend deployment

## Tech Stack

- Frontend: React.js, JavaScript, Axios, Vite
- Backend: FastAPI, Python, SQLAlchemy, SQLite
- Cloud: Azure Blob Storage Static Website, Azure App Service
- DevOps: GitHub Actions, Git, GitHub

## Architecture

```text
User
 ↓
Azure Blob Storage Static Website
 ↓
React Frontend
 ↓
Azure App Service
 ↓
FastAPI Backend
 ↓
SQLite Database
