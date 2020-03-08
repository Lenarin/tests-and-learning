package notes

import (
	"database/sql"
)

// Note - typedef of notes struct
type Note struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Text string `json:"text"`
}

// AllNotes - select, collect and return array of all notes
func AllNotes(db *sql.DB) ([]*Note, error) {
	rows, err := db.Query("SELECT * FROM notes")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	notes := make([]*Note, 0)
	for rows.Next() {
		note := new(Note)
		err := rows.Scan(&note.ID, &note.Name, &note.Text)
		if err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return notes, nil
}

// GetByID - select note with giver ID and return if founded
func GetByID(db *sql.DB, id string) (*Note, error) {
	sqlStr := "SELECT * FROM notes WHERE id=$1"
	resID := 0
	var name, text string
	err := db.QueryRow(sqlStr, id).Scan(&resID, &name, &text)
	if err != nil {
		return nil, err
	}
	return &Note{ID: resID, Name: name, Text: text}, nil
}

// PushNotes - create a query to insert given array of notes and return operation result
func PushNotes(db *sql.DB, notes []*Note) (sql.Result, error) {
	sqlStr := "INSERT INTO notes(name, text) VALUES "
	vals := []interface{}{}

	for _, note := range notes {
		sqlStr += "(?, ?),"
		vals = append(vals, note.Name, note.Text)
	}

	sqlStr = sqlStr[0 : len(sqlStr)-2]
	stmt, err := db.Prepare(sqlStr)

	if err != nil {
		return nil, err
	}

	res, err := stmt.Exec(vals...)

	if err != nil {
		return nil, err
	}

	return res, nil
}

// PushNote - insert one note to DB and return note with it's new id
func PushNote(db *sql.DB, note *Note) (*Note, error) {
	sqlStr := "INSERT INTO notes(name, text) VALUES ($1, $2) RETURNING id"
	id := 0
	err := db.QueryRow(sqlStr, note.Name, note.Text).Scan(&id)
	if err != nil {
		return nil, err
	}
	note.ID = id
	return note, nil
}

// DeleteNoteByID - delete note with given id from db and return deleted note
func DeleteNoteByID(db *sql.DB, id string) (*Note, error) {
	sqlStr := "DELETE FROM notes WHERE id = $1 RETURNING *"
	var name, text string
	retID := 0
	err := db.QueryRow(sqlStr, id).Scan(&retID, &name, &text)
	if err != nil {
		return nil, err
	}
	note := &Note{ID: retID, Name: name, Text: text}
	return note, nil
}

// UpdateNote - update note with providen id and info, return note if success
func UpdateNote(db *sql.DB, note *Note) (*Note, error) {
	sqlStr := "UPDATE notes SET name=$1, text=$2 WHERE id=$3"
	_, err := db.Exec(sqlStr, note.Name, note.Text, note.ID)
	if err != nil {
		return nil, err
	}
	return note, nil
}
