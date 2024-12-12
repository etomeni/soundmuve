// interface advertsInterface {
//     _id: string;
//     promopicUrl: string;
//     hyperLink: string;
//     createdAt: string;
// }


// I'v an array with this interface below write a function that takes in the userType,
// the userType can either be "artist" or "record label",
// if the passed in userType is "artist" then returns items with the userType
// "artist" or "All"; if the passed in userType is "record label" then 
// returns items with the userType "record label" or "All" from the array else 
// return all the items

// Here is what I mean
// the function userType parameter can either be "artist" | "record label"
// if it is "artist" return the array with items which the userType is "artist" | "All"
// if it is "record label" return the array with items which the userType is "record label" | "All"


export type promotionInterface = {
    _id: string;
    title: string;
    image: string;
    userType: "All" | "artist" | "record label";
    status: boolean;

    createdBy: {
        user_id: string;
        user_email: string;
        name: string;
    };

    createdAt: string;
    updatedAt: string;
};


