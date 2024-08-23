
// export const backendUrl = "https://soundmuve-backend-hqax.onrender.com";
export const backendUrl = "https://soundmuve-backend-zrap.onrender.com";
export const apiEndpoint = `${backendUrl}/api`;


export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Comprehensive email validation regex
  return emailRegex.test(email);
}


export const songArtistsCreativesRoles = [
  "Main artist", 'Featured', 'Producer',' 12 string guitar', 'acoustic guitar', 'actor', 'alto saxophone', 'alto solo', 'arranger', 
  'background vocals', 'banjo', 'baritone saxophone', 'baritone solo', 'bass clarinet', 'bass guitar', 'bass trombone', 
  'bassoon', 'bongos', 'cajon', 'cello', 'chair', 'choir master', 'chorus', 'clarinet', 'classical guitar', 'clavier', 
  'composer', 'conductor', 'congas', 'cornet', 'piano', 'vocal engineer', 'vocal solo', 'mixing engineer',  'music director', 
  'lead guitar'
];

export const primaryGenre = [
  'African', 'Alternative', 'Ambient', 'Americana', 'Big Band', 'Blues', 'Brazilian', "Children's Music",
  'Christian/Gospel', 'Classical Crossover', 'Comedy', 'Country', 'Dance', 'Electronic', 'Fitness & Workout',
  'Folk', 'French Pop', 'German Folk', 'German Pop', 'Heavy Metal', 'Indian', 'Instrumental',
  'J Pop', 'Jazz', 'K Pop', 'Karaoke', 'Latin', 'New Age', 'Pop', "R&B/Soul", 'Reggae',
  'Hip Hop/Rap', 'Holiday', 'Rock', 'Singer/Songwriter', 'Soundtrack', 'Spoken Word', 'Vocal', 'World'
];

export const secondaryGenre = [
  'African', 'Afro house', 'Afro-fusion', 'Afro-soul', 'Afrobeats', 'Afropop', 'Amapiano', 'Bongo Flava',
  'Highlife', 'Maskandi', 'Alternative', 'Ambient', 'Americana', 'Big Band', 'Blues', 'Brazilian', "Children's Music",
  'Christian/Gospel', 'Classical Crossover', 'Comedy', 'Country', 'Dance', 'Electronic', 'Fitness & Workout', 'Folk',
  'French Pop', 'German Folk', 'German Pop', 'Heavy Metal', 'Hip Hop/Rap', 'Holiday', 'Indian', 'Instrumental', 'J Pop',
  'Jazz', 'K Pop', 'Karaoke', 'Latin', 'New Age', 'Pop', 'R&B/Soul', 'Reggae', 'Rock', "Singer/Songwriter", 'Soundtrack',
  'Spoken Word', 'Vocal', 'World', 'Axé', 'Baile Funk', 'Bossa Nova', 'Chorinho', 'Forró', 'v Frevo', 'MPB', 'Pagode',
  'Samba', 'Sertanejo'
];

export const socialPlatformStores = [
  "All", "Youtube", "TikTok/TikTok Music/Resso", "Facebook/Instagram/Reels", "Capcut"
  //  "Snapchat",
];

export const musicStores = [
  "All",
  "ITunes", "Apple Music", "Spotify", "Amazon Music", "Pandora", "Deezer",
  "iHeartRadio", "Wynk/Hungama", "Qobuz", "Peloton", "Douyin Streaming/Qishi Yinyue",
  "MediaNet", "Tidal", "Gracenote", "YouSee Musik/Telmore Musik", "Napster", "Tencent",
  "Snapchat/ 7digital", "BOOM", "NetEase", "Gaana", "Joox", "TIM", "Boomplay Music"
];

export const hours = [...Array(13).keys()].map((num) => num.toString().padStart(2, '0'));
export const minutes = [...Array(60).keys()].map((num) => num.toString().padStart(2, '0'));
export const seconds = [...Array(60).keys()].map((num) => num.toString().padStart(2, '0'));

export const minReleaseDate = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}


export function getPinDisplayButtons() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "delete", "space"];

  // Remove "space" and "delete" from the array
  const filteredArr = arr.filter((item) => item !== "space" && item !== "delete");

  // Shuffle the remaining elements randomly
  for (let i = filteredArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredArr[i], filteredArr[j]] = [filteredArr[j], filteredArr[i]];
  }

  // Insert "space" at index 9 and "delete" as the last item
  filteredArr.splice(9, 0, "space");
  filteredArr.push("delete");

  return filteredArr;
}


export function pauseExecution(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


type respondsInterface = {
  display: boolean,
  status: boolean,
  message: string
}

export const artWorkAllowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

export const validateImageArtWork = async (file: File): Promise<respondsInterface> => {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.src = objectUrl;

  return new Promise((resolve) => {
    img.onload = async () => {
      const { width, height } = img;
      URL.revokeObjectURL(objectUrl);

      console.log("width => ", width);
      console.log("height => ", height);

      // const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB

        // Validate dimensions and size
        if (file.size > maxSize) {
          resolve({
            display: true,
            status: false,
            message: "File size must be smaller than 10MB."
          });
        } else if (!artWorkAllowedTypes.includes(file.type)) {
          resolve({
            display: true,
            status: false,
            message: "Invalid file type. Only JPG, PNG, and GIF are allowed."
          });
        } else if (width !== height) {
          resolve({
            display: true,
            status: false,
            message: "Image must be a perfect square."
          });
        } else if (width < 1600 || height < 1600) {
          // setError('Image dimensions must be at least 1600 x 1600 pixels.');
          resolve({
            display: true,
            status: false,
            message: "Image dimensions must be between 1600x1600 and 3000x3000 pixels."
          });
        } else if (width > 3000 || height > 3000) {
            // setError('Image dimensions must be at most 3000 x 3000 pixels.');
            resolve({
              display: true,
              status: false,
              message: "Image dimensions must be between 1600x1600 and 3000x3000 pixels."
            });
        } else {
            // Use sharp to check for blurriness, pixelation, and whitespace
            // try {
            //     const imgBuffer = await file.arrayBuffer();
            //     const image = sharp(Buffer.from(imgBuffer));
            //     const metadata = await image.metadata();
    
            //     // Add custom validation for blurriness, pixelation, and whitespace here
            //     // Placeholder example (need more complex logic for actual validation)
            //     if (metadata.width !== metadata.height) {
            //         setError('Image must be a perfect square.');
            //         resolve(false);
            //     }
    
            //     setError('');
            //     resolve(true);
            // } catch (e) {
            //     setError('Image validation failed.');
            //     resolve(false);
            // }

          resolve({
            display: false,
            status: true,
            message: ""
          });
        }
    };

    img.onerror = () => {
      resolve({
        display: true,
        status: false,
        message: "Error loading image."
      });
    };
  });
};


type base64Interface = {
  display: boolean,
  status: boolean,
  message: string,
  result?: any,
}

export const convertToBase64 = (file: File): Promise<base64Interface> => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    if (!file) resolve({
      display: false,
      status: false,
      message: ""
    });

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      // resolve(fileReader.result);
      resolve({
        display: false,
        status: true,
        message: "",
        result: fileReader.result
      });
    }

    fileReader.onerror = (_error) => {
      resolve({
        display: true,
        status: false,
        message: "Error loading image."
      });
    }
  });
}


export const getQueryParams = (query: string) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const result = params.get(query);

  return result;
}





export function maskPhoneNumber(phoneNumber: string) {
  // Remove any non-digit characters from the input
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number has at least 4 digits
  if (cleanedNumber.length < 4) {
    return phoneNumber;
    // return 'Invalid phone number';
  }

  // Extract the last 4 digits
  const lastFourDigits = cleanedNumber.slice(-4);

  // Create a masked version with asterisks
  const maskedNumber = '*'.repeat(cleanedNumber.length - 4) + lastFourDigits;

  return maskedNumber;
}


export function maskEmailAddress(email: string) {
  // Split the email address into username and domain parts
  const [username, domain] = email.split('@');

  const lastThreeCharacters = username.slice(-3);
  const firstTwoCharacters = username.slice(0, 2);


  // Mask the username part
  const maskedUsername = firstTwoCharacters + '*'.repeat(username.length - 5) + lastThreeCharacters;

  // // Extract the last 3 characters before the @ symbol
  // const maskedDomain = domain.slice(0, domain.length - 3) + '*'.repeat(3);

  // Combine the masked parts to form the masked email
  const maskedEmail = `${maskedUsername}@${domain}`;

  return maskedEmail;
}


// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
  // Use a regular expression to match special characters and spaces
  const regex = /[^a-zA-Z0-9\s]/g;

  // Replace special characters with an empty string and spaces with hyphens
  const sanitizedString = text.replace(regex, "").replace(/\s+/g, "-");

  return sanitizedString;
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  // return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;

  const items = name.split(" ");

  let newName = '';
  for (let i = 0; i < items.length; i++) {
      newName = newName + items[i][0];
      if (i > 1) break;
  }
  return newName;
};

export function formatedNumber(number: number, locales = 'en-US', options = {}) {
  return new Intl.NumberFormat(locales, options).format(number);
}


export const currencyDisplay = (amount: number) => {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return formattedAmount;
};

export function displayMessageCount(messageCount: number) {
  if (messageCount < 1000) {
    return messageCount.toString(); // No suffix needed for less than 1000
  } else if (messageCount < 1000000) {
    return (messageCount / 1000).toFixed(2) + "K"; // Suffix K for thousands
  } else if (messageCount < 1000000000) {
    return (messageCount / 1000000).toFixed(2) + "M"; // Suffix M for millions
  } else {
    return (messageCount / 1000000000).toFixed(2) + "B"; // Suffix B for billions
  }
}