export const allMoviesQuery = `
    {
      movies {
        genre
        id
        name
        director {
          name
          id
        }
      }
    }
`
export const allDirectorsQuery = `
    {
        directors {
        name
        id
        }
    }
`