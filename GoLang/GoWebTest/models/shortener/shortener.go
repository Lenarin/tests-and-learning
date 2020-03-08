package shortener

import (
	"database/sql"
)

// Shortener - typedef of URL shortener struct
type Shortener struct {
	ID          int    `json:"id"`
	OriginalURL string `json:"original_url"`
	ShortURL    string `json:"short_url"`
}

// GetAll - get list of all shorteners
func GetAll(db *sql.DB) ([]*Shortener, error) {
	rows, err := db.Query("SELECT * FROM url_shorts")
	if err != nil {
		return nil, err
	}

	shorteners := make([]*Shortener, 0)
	for rows.Next() {
		shortener := new(Shortener)
		err := rows.Scan(&shortener.ID, &shortener.OriginalURL, &shortener.ShortURL)
		if err != nil {
			return nil, err
		}
		shorteners = append(shorteners, shortener)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return shorteners, nil
}

// PushNew - push new shortener into db and return shortener with it's new ID
func PushNew(db *sql.DB, shortener *Shortener) (*Shortener, error) {
	sqlStr := "INSERT INTO url_shorts VALUES (DEFAULT, $1, $2) RETURNING id"
	id := 0
	err := db.QueryRow(sqlStr, shortener.OriginalURL, shortener.ShortURL).Scan(&id)
	if err != nil {
		return nil, err
	}
	shortener.ID = id
	return shortener, nil
}

// DeleteByID - delete shortener row with given ID from db
func DeleteByID(db *sql.DB, id string) (*Shortener, error) {
	sqlStr := "DELETE FROM url_shorts WHERE id=$1 RETURNING *"
	shortener := new(Shortener)
	err := db.QueryRow(sqlStr, id).Scan(&shortener.ID, &shortener.OriginalURL, &shortener.ShortURL)
	if err != nil {
		return nil, err
	}
	return shortener, nil
}

// GetFirstByURL - find first row with given original URL
func GetFirstByURL(db *sql.DB, url string) (*Shortener, error) {
	sqlStr := "SELECT * FROM url_shorts WHERE short_url = $1 LIMIT 1"
	shortener := new(Shortener)
	err := db.QueryRow(sqlStr, url).Scan(&shortener.ID, &shortener.OriginalURL, &shortener.ShortURL)
	if err != nil {
		return nil, err
	}
	return shortener, nil
}

// GetFirstByID - find first row with given original ID
func GetFirstByID(db *sql.DB, id string) (*Shortener, error) {
	sqlStr := "SELECT * FROM url_shorts WHERE id = $1 LIMIT 1"
	shortener := new(Shortener)
	err := db.QueryRow(sqlStr, id).Scan(&shortener.ID, &shortener.OriginalURL, &shortener.ShortURL)
	if err != nil {
		return nil, err
	}
	return shortener, nil
}
