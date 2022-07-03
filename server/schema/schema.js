import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } from "graphql";

import directors from "../models/director.js";
import movies from "../models/movie.js";

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve({ directorId }, args, content, info) {
                return directors.findById(directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve({ id }, args) {
                return movies.find({ directorId: id })
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, { id }) {
                return movies.findById(id)
            }
        },

        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies.find({});
            }
        },

        director: {
            type: DirectorType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, { id }) {
                return directors.findById(id)
            }
        },

        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, { name, age }) {
                const director = new directors({
                    name,
                    age
                })
                return director.save()
            }
        },

        deleteDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, { id }) {
                return directors.findByIdAndRemove(id)
            }
        },

        editDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, { id, name, age }) {
                return directors.findByIdAndUpdate(id, {
                    name,
                    age,
                }, { new: true })
            }
        },

        addMovie: {
            type: MovieType,
            args: {
                directorId: { type: GraphQLString },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
            },
            resolve(parent, { directorId, name, genre }) {
                const movie = new movies({
                    name,
                    genre,
                    directorId
                })
                return movie.save()
            }
        },

        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, { id }) {
                return movies.findByIdAndRemove(id)
            }
        },

        editMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLString },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLString },
            },
            resolve(parent, { id, name, genre, directorId }) {
                return movies.findByIdAndUpdate(id, {
                    name,
                    genre,
                    directorId,
                }, { new: true })
            }
        },
    }
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})