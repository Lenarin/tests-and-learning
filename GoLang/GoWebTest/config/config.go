package config

import "database/sql"

// Env - stctuct of enviroment variables
type Env struct {
	DB *sql.DB
}

// NewDB - creates new DB connection with fivven connecion source
func NewDB(dataSourceName string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
