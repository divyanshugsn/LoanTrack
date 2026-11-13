
# Git Branching Strategy

## Branching Model

This project follows a simplified GitFlow branching strategy.

- `main`: Contains stable, deployable releases.
- `develop`: Integration branch for completed features.
- `feature/*`: Isolated branches for individual assignment tasks.

Each feature branch is created from `develop` and merged back
through a Pull Request after implementation and testing.

Releases are promoted from `develop` to `main` through a
Pull Request. No direct commits are made to either protected
integration branch.

## Feature Branch Naming

Examples:

- feature/git-foundation
- feature/application
- feature/docker
- feature/database
- feature/kubernetes
- feature/documentation

## Commit Convention

Commits describe the actual intent of the change.

Examples:

- add initial loan tracking application structure
- implement backend loan listing endpoint
- add PostgreSQL connection pooling
- configure backend readiness probe

## Pull Request Process

1. Create a feature branch from develop.
2. Implement and test the changes.
3. Push the feature branch.
4. Open a Pull Request targeting develop.
5. Review the changed files and leave a review comment.
6. Merge after verifying the implementation.

## Suitability for a Team of Five

This workflow provides isolation, traceability and code review.
However, for a team of five shipping daily, I would consider
a lighter GitHub Flow approach with short-lived feature branches,
continuous integration and frequent releases.

This reduces integration overhead while retaining review and
deployment controls.
