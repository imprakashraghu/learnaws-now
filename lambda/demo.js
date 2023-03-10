import https from "https";

function getRequest(name) {
  const url = 'https://api.agify.io/?name='+name;

  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

export const handler = async(event) => {
    try {
    const result = await getRequest(event.name);
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: "Age of "+event.name +" is: "+result.age
    };
  } catch (error) {
    console.log('Error is: 👉️', error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
