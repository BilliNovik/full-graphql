export const removeMovieMutation = `
    mutation ( $id:String ) {
        deleteMovie( id: $id ) {
            id
        }
    }
`
export const addMovieMutation = `
    mutation ( $name: String, $genre: String, $directorId: String ) {
        addMovie(
            name: $name,
            genre: $genre,
            directorId: $directorId
        ) {
            name
            id
            genre
        }
    }
`
export const changeMovieMutation = `
    mutation ($name: String, $genre: String, $directorId: String, $id: String,) {
        editMovie(
            genre: $genre, 
            name: $name, 
            directorId: $directorId,
            id: $id
        ) {
            genre
            id
            name
        }
    }
`