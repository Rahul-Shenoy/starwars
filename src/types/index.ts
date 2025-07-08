export interface Planet {
    id: String;
    name: String;
}

export interface Character {
    id: String,
    name: String,
    gender: String,
    skin_color: String,
    hair_color: String,
    height: Number,
    eye_color: String,
    mass: Number,
    birth_year: String,
    homeworld: String,
    home_planet: String,
    url: String,
    isFavourite?: boolean;
}