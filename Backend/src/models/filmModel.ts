import mongoose, { Schema} from "mongoose";

const fileSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    genre: { type: String, required: true},
    director: { type: String, required: true},
    releaseDate : { type: String, required: true},
    link: { type: String, required: true},
    cast: { type: [String], required: true },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    crew: { 
        dop: { type: String },
        editing: { type: String },
        dialogues: { type: String },
        story: { type: String },
        assistantDirectors: { type: [String] },
        coDirector: { type: String },
        executiveProducer: { type: String },
        coProducer: { type: String },
        producer: { type: String },
        music: { type: String },
    }
})

const Film = mongoose.model('Films',fileSchema);

export default Film;