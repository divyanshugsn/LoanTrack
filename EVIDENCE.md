# LoanTrack — Implementation Evidence

This document contains terminal outputs and verification results for the LoanTrack assignment.

**Environment:** Windows 11, PowerShell, Docker Desktop, Minikube.

---

## B. Docker Implementation

### B1. Docker Images

**Command:**
```powershell
docker images
```

**Evidence:**
<!-- Paste actual output here -->

### B2. Container Status

**Command:**
```powershell
docker compose ps
```

**Evidence:**
<!-- Paste actual output here -->

### B3. Non-root Container Verification

**Backend:**
```powershell
docker exec loantrack-backend whoami
```

**Frontend:**
```powershell
docker exec loantrack-frontend whoami
```

**Evidence:**
<!-- Paste actual output here -->

### B4. Application Access

**Frontend:** http://localhost:8080

<!-- Add screenshot showing the running application -->

---

## C. Database and Connectivity

### C1. Database Schema and Seed Data

**Command:**
```powershell
docker exec loantrack-postgres psql -U loantrack_user -d loantrack -c "\d loans"
docker exec loantrack-postgres psql -U loantrack_user -d loantrack -c "SELECT COUNT(*) FROM loans;"
```

**Evidence:**
<!-- Paste actual output here -->

### C2. Connection Pooling

Implementation: PostgreSQL connection pooling is configured using `pg.Pool` in `backend/src/config/database.js`.

Configuration:
- Maximum connections: 10
- Idle timeout: 30 seconds
- Connection timeout: 5 seconds

### C3. Backend Startup Retry and Recovery

The backend starts independently and retries its PostgreSQL connection using exponential backoff.

**Evidence:**

```text
<!-- Paste the actual backend startup retry and recovery logs here -->
```

### C4. Health and Readiness Checks

**Commands:**
```powershell
curl.exe -i http://localhost:8080/healthz
curl.exe -i http://localhost:8080/readyz
```

**Evidence:**
<!-- Paste actual output here -->

### C5. Frontend-to-Database Verification

A loan was created through the frontend and verified directly in PostgreSQL.

**Command:**
```powershell
docker exec loantrack-postgres psql -U loantrack_user -d loantrack -c "SELECT * FROM loans ORDER BY id DESC LIMIT 5;"
```

**Evidence:**
<!-- Paste actual output here -->

### C6. Database Persistence

The PostgreSQL named volume was retained after running `docker compose down` and starting the application again.

**Evidence:**
<!-- Paste actual query output showing the previously created loan after restart -->

### C7. Volume Deletion

After running `docker compose down -v`, the PostgreSQL volume was removed.

**Evidence:**
<!-- Paste before/after row counts, if this test was performed -->

**Observation:** Removing the named volume deletes the persisted database data. On the next startup, PostgreSQL initializes a fresh database and executes its initialization SQL scripts again.

---

## D. Kubernetes Implementation

### D1. Namespace and Workloads

**Commands:**
```powershell
kubectl get namespace
kubectl get deployments -n loantrack
kubectl get statefulsets -n loantrack
kubectl get pods -n loantrack
kubectl get pvc -n loantrack
```

**Evidence:**
<!-- Paste actual output here -->

### D2. ConfigMaps and Secrets

**Command:**
```powershell
kubectl get configmaps -n loantrack
kubectl get secrets -n loantrack
```

**Evidence:**
<!-- Paste actual output here -->

Do not paste Secret values or database passwords.

### D3. Kubernetes Services

**Command:**
```powershell
kubectl get services -n loantrack
```

**Evidence:**
<!-- Paste actual output here -->

### D4. Database DNS and Connectivity

The backend connects to PostgreSQL using the Kubernetes Service DNS name.

**Evidence:**
<!-- Paste the actual DNS resolution and database connectivity output from the backend Pod -->

### D5. Backend Scaling

The backend Deployment was scaled to three replicas.

**Command:**
```powershell
kubectl scale deployment backend --replicas=3 -n loantrack
kubectl get pods -n loantrack
```

**Evidence:**
<!-- Paste actual output showing three Running backend Pods -->

### D6. Rolling Update and Rollback

**Evidence:**
<!-- Paste rollout status for v2 and the rollback output -->

### D7. Backend Pod Self-Healing

**Evidence:**
<!-- Paste the Pod deletion command and output showing its replacement -->

### D8. PostgreSQL Pod Recovery

**Evidence:**
<!-- Paste the PostgreSQL Pod deletion command and output showing the replacement Pod and persistent data -->

### D9. Final Kubernetes Resource Verification

**Commands:**
```powershell
kubectl get all -n loantrack
kubectl get pvc,configmap,secret -n loantrack
```

**Evidence:**
<!-- Paste actual output here -->

---

## Screenshots

Store application screenshots under:

```text
evidence/
├── docker-application.png
└── kubernetes-application.png
```

---

## Final Verification

All evidence in this document should represent actual commands and outputs collected during implementation. No credentials, passwords, or sensitive Secret values should be included.