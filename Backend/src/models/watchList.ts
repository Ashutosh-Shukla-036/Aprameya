import mongoose, { Schema} from "mongoose";

const WatchListSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    film: { type: mongoose.Schema.Types.ObjectId, ref: 'Films', required: true },
    link: { type: String, required: true },
    title: { type: String, required: true }, 
    description: { type: String, required: true} 
});

const WatchList = mongoose.model("watchlist", WatchListSchema);

export default WatchList;