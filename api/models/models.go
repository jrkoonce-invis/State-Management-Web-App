package models

type Post struct {
	Text   string `json:"text"`
	Number int    `json:"number"`
}

type User struct {
	Userid int    `json:"userid"`
	Posts  []Post `json:"posts"`
}
