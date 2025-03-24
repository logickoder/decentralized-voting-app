-- CreateTable
CREATE TABLE "Candidate"
(
    "id"        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"      TEXT     NOT NULL,
    "bio"       TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
