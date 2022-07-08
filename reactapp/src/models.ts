export interface MovieModel {
    title: string
    image: string
    description: string
    vote: number
    note: number
    date: string
    backdrop_path: string
    adult: boolean
    popularity: number
    genre_ids: number[]
}

// export function getData() {
//     const movies: MovieModel[] = [
//         {
//             title: "Spider man",
//             image: "https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png",
//             description: "Peter Parker seeks Doctor Strange's help to make people forget about Spiderman's identity. However, when the spell he casts gets corrupted, several unwanted guests enter their universe.",
//             note: 8.2,
//             vote: 3,
//         },
//         {
//             title: "Doctor Strange",
//             image: "https://fr.web.img2.acsta.net/pictures/16/09/09/08/57/518191.jpg",
//             description: "Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle..",
//             note: 6,
//             vote: 5,
//         },
//         {
//             title: "Black Panther: Wakanda Forever",
//             image: "https://entzhood.com.ng/wp-content/uploads/2022/05/Black-Panther-Wakanda-Forever.jpg",
//             description: "Black Panther: Wakanda Forever is an upcoming American superhero film based on the Marvel Comics character Black Panther. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is intended to be the sequel to Black Panther and the 30th film in the Marvel Cinematic Universe.",
//             note: 9.8,
//             vote: 7,
//         },
//         {
//             title: "Thor: Love and Thunder",
//             image: "https://www.scrolldroll.com/wp-content/uploads/2022/06/thorloveandthunder-hollywood-movies-releasing-in-june-2022.jpg",
//             description: "Thor embarks on a journey unlike anything he's ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods.",
//             note: 8.6,
//             vote: 3,
//         },
//         {
//             title: "Captain America",
//             image: "https://m.media-amazon.com/images/I/91zlVmXTLOL._AC_SL1500_.jpg",
//             description: "Captain America is a superhero appearing in American comic books published by Marvel Comics. Created by cartoonists Joe Simon and Jack Kirby, the character first appeared in Captain America Comics #1 from Timely Comics, a predecessor of Marvel Comics.",
//             note: 8.6,
//             vote: 4,
//         },
//         {
//             title: "Black widow",
//             image: "https://m.media-amazon.com/images/I/81dtJA--S9L._AC_SL1500_.jpg",
//             description: "Thor embarks on a journey unlike anything he's ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods.",
//             note: 9.6,
//             vote: 5,
//         },
//     ]
//     return movies
// }
